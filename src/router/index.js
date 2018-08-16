/**
 * 路由器对象模块
 *
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home/Home'
import Order from '../pages/order/Order'
import Search from '../pages/search/Search'
import Person from '../pages/person/Person'
import Login from '../pages/login/Login'

Vue.use(VueRouter);

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
    }
  ]
})
