/**
 * 路由器对象模块
 *
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../pages/home/Home'
// import Order from '../pages/order/Order'
// import Search from '../pages/search/Search'
// import Person from '../pages/person/Person'
// import Login from '../pages/login/Login'
// import Shop from '../pages/shop/Shop'

// 路由组件懒加载
const Home = () => import('../pages/home/Home.vue')
const Order = () => import('../pages/order/Order.vue')
const Search = () => import('../pages/search/Search.vue')
const Person = () => import('../pages/person/Person')
const Login = () => import('../pages/login/Login.vue')
const Shop = () => import('../pages/shop/Shop.vue')

import ShopGoods from '../pages/shop/shopGoods/ShopGoods'
import ShopRatings from '../pages/shop/shopRatings/ShopRatings'
import ShopInfo from '../pages/shop/shopInfo/ShopInfo'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/person',
      component: Person,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: 'goods',
          component: ShopGoods
        },
        {
          path: 'ratings',
          component: ShopRatings
        },
        {
          path: 'info',
          component: ShopInfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    }
  ]
})
