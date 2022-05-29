import { reqGetSearchInfo } from "@/api"

// Search模块的仓库
const state = {
  // 仓库初始状态
  searchList: {}
}

const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}

const actions = {
  // 获取Search模块数据
  // async getSearchList(context) {
  async getSearchList({ commit }, params = {}) {   //{commit}是对context的解构赋值
    let result = await reqGetSearchInfo(params)
    if (result.code == 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}
// 为简化数据而生,方便组件获取数据
const getters = {
  goodsList(state) {
    // 这样写有问题，
    // searchList可能是个空对象，不包含goodsList，返回值是undefined
    // 解决方法：空对象时，至少返回一个空数组
    return state.searchList.goodsList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  }
}


export default {
  state, mutations, actions, getters
}