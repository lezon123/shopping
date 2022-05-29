import Vue from 'vue'
import VueRouter from 'vue-router'
//引入路由规则
import routes from '@/router/routes'
import store from '@/store'

// 使用插件
Vue.use(VueRouter)


let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写push
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
// 重写replace
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

const router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPostion) {
    //返回y=0，代表滚动条在最上方
    return { y: 0 }
  }
})
// 全局前置守卫(在路由跳转之前进行判定)
router.beforeEach(async (to, from, next) => {
  // to :将要跳转到的那个路由信息
  // from: 从哪个路由而来的信息
  // next(): 全部路由都放行
  // next(path) :放行到指定路由 
  // next(false):中断当前导航
  // next()
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if (token) {
    // 登录了,想跳转到登录页面
    if (to.path == '/login') {

      // 则跳转到首页
      next('/home')
    } else {
      // 登录了,跳转到其他页面
      // 有用户信息
      if (name) {
        next()
      } else {
        // 登录了,但当前页面没有用户信息,
        // 派发actions获取用户信息后再跳转
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token失效了,获取不到用户信息,重新登录
          // 清除用户信息
          await store.dispatch('userLogout')
          // 跳转到登录页面
          next('/login')
        }
      }
    }
  } else {
    // 未登录，不能去【支付相关页面】，【个人中心】
    // 可以去  ，【首页】【搜索】【购物车】
    let toPath = to.path
    if (toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1 || toPath.indexOf('/trade') != -1) {
      // 把未登录时准备去的页面路由，存储在路径中
      next('/login?redirect=' + toPath)
    } else {

      next()
    }
  }

})



export default router