/**
 * 直接更新state的多个方法的对象
 *
 */
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
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
  }

}
