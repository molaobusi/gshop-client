/**
 * 直接更新state的多个方法的对象
 *
 */
import Vue from 'vue'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART,
  RECEIVE_SEARCH_SHOPS
} from './mutations-types'

export default {
  // 接收地址的mutations方法
  [RECEIVE_ADDRESS](state, address) {
    state.address = address
  },

  // 接收商品列表的mutations方法
  [RECEIVE_CATEGORYS](state, categoryList) {
    state.categoryList = categoryList
  },

  // 接收商铺列表的mutations方法
  [RECEIVE_SHOPS](state, shopList) {
    state.shopList = shopList
  },

  // 接收用户信息的mutations方法
  [RECEIVE_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },

  // 清空用户信息的mutations方法
  [RESET_USER_INFO](state) {
    state.userInfo = {}
  },

  // 接收商品数组的mutations方法
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },

  // 接收商家评价数组
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },

  // 接收商家信息
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },

  // 增加food中的count值
  [INCREMENT_FOOD_COUNT](state, food) {
    if (!food.count) {
      Vue.set(food, 'count', 1)
      state.cartFoods.push(food)
    } else {
      food.count++
    }
  },

  // 减少food中的count值
  [DECREMENT_FOOD_COUNT](state, food) {
    if (food.count) {
      food.count--
      if (food.count === 0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },

  // 清空购物车
  [CLEAR_CART](state) {
    // 将每种选中的商品数量都设置为0
    state.cartFoods.forEach(food => food.count = 0)
    // 将购物车数组置空
    state.cartFoods = []
  },

  // 接收搜索商家列表
  [RECEIVE_SEARCH_SHOPS](state, searchShops) {
    state.searchShops = searchShops
  }

}
