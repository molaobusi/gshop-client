/**
 * 通过mutation间接更新state的多个方法的对象
 *
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO
} from './mutations-types'

import {
  reqAddress,
  reqFoodCategoryList,
  reqShopList
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

  // 保存用户信息的action方法
  saveUserInfo({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, userInfo)
  }


}
