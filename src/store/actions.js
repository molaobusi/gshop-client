/**
 * 通过mutation间接更新state的多个方法的对象
 *
 */
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
  CLEAR_CART
} from './mutations-types'

import {
  reqAddress,
  reqFoodCategoryList,
  reqShopList,
  reqUserinfo,
  reqLogout,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo
} from '../api/index'

export default {
  // 根据经纬度异步获取位置详情的action方法
  async getAddress({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    if (result.code === 0) {
      commit(RECEIVE_ADDRESS, result.data)
    }
  },

  // 异步获取食品分类列表的action方法
  async getFoodCategoryList({commit}) {
    const result = await reqFoodCategoryList()
    if (result.code === 0) {
      commit(RECEIVE_CATEGORYS, result.data)
    }
  },

  // 根据经纬度异步获取商铺列表的action方法
  async getShopList({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShopList(longitude, latitude)
    if (result.code === 0) {
      commit(RECEIVE_SHOPS, result.data)
    }
  },

  // 同步获取用户信息保存到state中的action方法
  saveUserInfo({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, userInfo)
  },

  // 异步获取用户信息保存到state中的action方法
  async getUserInfo({commit}) {
    const result = await reqUserinfo()
    if (result.code === 0) {
      commit(RECEIVE_USER_INFO, result.data)
    }
  },

  // 异步退出登录的action方法
  async logout({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit}, callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      callback && callback()
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit}) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },

  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },

  // 同步增加或减少商品的count数量
  updateFoodCount({commit}, {isAdd, food}) {
    if (isAdd) { // 增加
      commit(INCREMENT_FOOD_COUNT, food)
    } else { // 减少
      commit(DECREMENT_FOOD_COUNT, food)
    }
  },

  // 清空购物车
  clearCart({commit}) {
    commit(CLEAR_CART)
  }
}
