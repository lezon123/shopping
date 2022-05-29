import { reqGetCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api"
import { setToken, getToken, removeToken } from '@/utils/token.js'
const state = {
  code: '',
  token: getToken('TOKEN'),
  userInfo: {}
}

const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR(state) {
    // 仓库中用户信息清空
    state.token = ''
    state.userInfo = {}
    // 本地存储数据清空
    removeToken()
  }

}

const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    // 把验证码返回，正常情况应该是把验证码发到用户手机上
    let result = await reqGetCode(phone)
    // console.log(result);
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return Promise.resolve('发送验证码成功')
    } else {
      return Promise.reject(new Error('获取验证码失败'))
    }

  },
  // 用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user)
    console.log(result);
  },
  // 用户登录【token】
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data)
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token);
      setToken(result.data.token)
      return Promise.resolve('登录成功')
    } else {
      return Promise.reject('登录失败')
    }

  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      commit('GETUSERINFO', result.data)

      return Promise.resolve('获取用户信息成功')
    } else {
      return Promise.reject(new Error('获取用户信息失败'))
    }

  },
  // 退出登录
  async userLogout({ commit }) {
    // 只是向服务器发起请求，通知服务器清除token
    let result = await reqLogout()
    if (result.code == 200) {
      commit('CLEAR')
      return Promise.resolve('退出登录成功')
    } else {

      return Promise.reject(new Error('退出登录失败'))
    }
  }
}

const getters = {}


export default {
  state, mutations, actions, getters
}