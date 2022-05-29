// home模块的小仓库
import { reqCatagoryList, reqGetBannerList, reqFloorList } from "@/api"
const state = {
  // 起始值根据根据服务器返回值决定
  categoryList: [],
  // 轮播图的数据
  bannerList: [],
  // Floor组件的数据
  floorList: []
}

const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    // console.log('正在修改仓库中的bannerList数据');
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }

}

const actions = {
  async categoryList({ commit }) {
    let result = await reqCatagoryList();
    if (result.code == 200) {
      // 向mutations提交数据
      commit('CATEGORYLIST', result.data);
    }
  },
  // 获取首页轮播图的数据
  async getBannerList({ commit }) {
    console.log('向服务器发起Ajax请求获取轮播图');
    let result = await reqGetBannerList();
    // console.log(result);
    if (result.code == 200) {

      commit('GETBANNERLIST', result.data)
    }

  },
  async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code == 200) {
      commit('GETFLOORLIST', result.data)
    }
  }
}

const getters = {}


export default {
  state, mutations, actions, getters
}