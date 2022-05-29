import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"
// 封装游客身份模块  
// import { getUUID } from '@/utils/uuid_token.js'

const state = {
  cartList: []
}

const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}

const actions = {
  // 获取购物车列表的数据
  async getCartList({ commit }) {
    let result = await reqCartList()
    //  测试是否能获取数据
    if (result.code == 200) {
      commit('GETCARTLIST', result.data)
    }

  },
  // 删除购物车某个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId)
    if (result.code == 200) {
      return Promise.resolve('删除成功')
    } else {
      return Promise.reject(new Error('删除失败'))
    }
  },
  async updateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked)
    if (result.code == 200) {
      return Promise.resolve('修改成功')
    } else {
      return Promise.reject(new Error('修改失败'))
    }
  },
  // {dispatch，getters}是对context的解构赋值
  deleteAllCheckedCart({ dispatch, getters }) {
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      PromiseAll.push(promise)
      // console.log(result);

    })
    return Promise.all(PromiseAll)
  },
  updateAllCartChecked({ dispatch, state }, isChecked) {
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach((item) => {
      let p = dispatch('updateCheckedById', {
        skuId: item.skuId, isChecked
      })
      promiseAll.push(p)
    })
    return Promise.all(promiseAll)
  }
}

const getters = {
  cartList() {
    return state.cartList[0] || {}
  }
}


export default {
  state, mutations, actions, getters
}
