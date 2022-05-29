import request from "./request";
import mockRequest from '@/api/mockAjax'
// 三级联动接口
// http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList   get   无参数

export const reqCatagoryList = () => {
  // 发请求
  return request({
    url: '/product/getBaseCategoryList',
    method: 'GET'
  })

}

// 获取banner数据
export const reqGetBannerList = () => mockRequest.get('/banner')
// 获取floor数据
export const reqFloorList = () => mockRequest.get('floor')

// 获取Search模块数据，地址:api/list  请求方式：post
// 当前这个接口，给服务器发送请求时传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params) => request({
  url: '/list',
  method: 'POST',
  data: params
})

// 获取产品详情信息的接口 URL：/api/item/{skuid}  请求方式：GET
export const reqGoodsInfo = (skuId) => request({
  url: `/item/${skuId}`,
  method: 'GET'
})

// 添加到购物车,URL:`/api/cart/addToCart/skuId/skuNum`,请求方式：POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => request({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'POST'
})
// 获取购物车列表数据的接口 URL：'/api/cart/cartList'   请求方式：GET
export const reqCartList = () => request({
  url: '/cart/cartList',
  method: 'GET'
})

// 删除购物车产品的接口 URL：'/api/cart/deleteCart/{skuId}   请求方法：'DELETE'
export const reqDeleteCartById = (skuId) => request({
  url: `/cart/deleteCart/${skuId}`,
  method: 'DELETE'
})

// 修改商品的状态 URL:'/api/checkCart/{skuId}/{isChecked}' , 请求方式: 'GET'
export const reqUpdateCheckedById = (skuID, isChecked) => request({
  url: `/cart/checkCart/${skuID}/${isChecked}`,
  method: 'GET'
})

// 获取验证码接口： URL:'/api/user/passport/sendCode/{phone}'   请求方式：GET
export const reqGetCode = (phone) => request({
  url: `/user/passport/sendCode/${phone}`,
  method: 'GET'
})
// 用户提交注册的接口  URL：`/api/user/passport/register`   请求方式：POST
export const reqUserRegister = (data) => request({
  url: '/user/passport/register',
  data,
  method: 'POST'
})

// 用户登录的接口 URL：`/api/user/passport/login`    请求方式：post   参数：phone  password
export const reqUserLogin = (data) => request({
  url: `/user/passport/login`,
  data,
  method: 'POST'
})

// 获取用户信息接口【需要带着用户的token向用户获取用户信息】
// URL：`/api/user/passport/auth/getUserInfo` 请求方式 GET
export const reqUserInfo = () => request({
  url: `/user/passport/auth/getUserInfo`,
  method: 'GET'

})

// 退出登录 URL:`/api/user/passport/logout`  请求方式 GET
export const reqLogout = () => request({
  url: '/user/passport/logout',
  method: 'GET'
})


// 获取用户地址信息
// URL: /api/user / userAddress / auth / findUserAddressList
// 请求方式:GET
export const reqAddressInfo = () => request({
  url: '/user/userAddress/auth/findUserAddressList',
  method: 'GET'
})

// 获取商品清单 URL:'/api/order/auth/trade'  请求方式:GET
export const reqOrderInfo = () => request({
  url: '/order/auth/trade',
  method: 'GET'

})

// 提交订单  URL:/api/order/auth/submitOrder?tradeNo={tradeNo}  请求方式：POST
export const reqSubmitOrder = (tradeNo, data) => request({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  data,
  method: 'POST'
})

// 获取支付信息
export const reqPayInfo = (orderId) => request({
  url: `/payment/weixin/createNative/${orderId}`,
  method: 'GET'
})

// 查询订单支付状态
export const reqPayStatus = (orderId) => request({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: 'GET'
})

// 获取我的订单列表 URL；/api/order/auth/{page}/{limit}  请求方式 GET
export const reqMyOrderList = (page, limit) => request({
  url: `/order/auth/${page}/${limit}`,
  method: 'GET'
})