import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api"
import { getUUID } from "@/utils/uuid_token"
const state = {
  goodInfo: {},
  uuid_token: getUUID()
}
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo

  }
}

const actions = {
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.code == 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum)
    // 服务器写入数据成功，不需要返回其他数，只需要返回code==200
    // 所以不需要往state中存数据
    // console.log(result);
    if (result.code == 200) {
      return Promise.resolve('加入购物车成功');
    } else {
      return Promise.reject(new Error('加入购物车失败'))
    }

  }
}


const getters = {
  categoryView(state) {
    // goodInfo可能是空对象，导致categoryView为undefined
    return state.goodInfo.categoryView || {};
  },
  skuInfo(state) {
    // 同上
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}



export default {
  state, mutations, actions, getters
}