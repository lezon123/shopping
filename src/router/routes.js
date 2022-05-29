// 引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Login from '@/pages/Login'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'
export default [
  {
    path: '/center',
    component: Center,
    meta: { show: true },
    // 二级路由
    children: [
      {
        path: 'myorder',
        component: MyOrder,
      },
      {
        path: 'grouporder',
        component: GroupOrder
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
  {
    path: '/paysuccess',
    component: PaySuccess,
    meta: { show: true },
    // beforeEnter: (to, from, next) => {
    //   if (from.path == '/pay') {
    //     next()
    //   } else {
    //     next(false)
    //   }
    // }
  },
  {
    path: '/pay',
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/trade',
    component: Trade,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/login',
    component: Login,
    meta: { show: true }
  },
  {
    path: '/shopcart',
    component: ShopCart,
    meta: { show: true }
  },
  {
    name: 'addcartsuccess',
    path: '/addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true }
  },
  {
    path: '/detail/:skuid',
    component: Detail,
    meta: { show: true }
  },
  {
    path: '/home',
    component: Home,
    meta: { show: true }
  },
  {
    name: 'search',
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true },
    // props: true,
    /*    props: {
         a: 1, b: 2
       } */
    props($route) {
      return { keyword: $route.params.keyword, big: $route.query.k }
    }
  },
  {
    path: '/login',
    component: Login,
    meta: { show: false }
  },
  {
    path: '/register',
    component: Register,
    meta: { show: false }
  },
  {
    path: '*',
    redirect: '/home',
    meta: { show: true }
  }

]