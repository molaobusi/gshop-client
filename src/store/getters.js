/**
 * 包含多个基于state的getter计算属性的对象
 *
 */
export default {
  // 购物车商品总数
  totalCount(state) {
    return state.cartFoods.reduce((preTotal, food) => (preTotal + food.count), 0)
  },
  // 购物车商品总价
  totalPrice(state) {
    return state.cartFoods.reduce((preTotal, food) => (preTotal + food.count * food.price), 0)
  },

  // 计算满意的评论总数
  satisfiedCount(state) {
    return state.ratings.reduce((preCount, rating) => preCount + (rating.rateType === 0 ? 1 : 0), 0)
  }
}















