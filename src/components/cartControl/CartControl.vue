<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-offline_fill" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-addition_fill" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
  export default {
    name: 'CartControl',
    props: {
      food: Object
    },
    methods: {
      // 增加或减少的方法，true表示增加操作，false表示减少操作
      updateFoodCount(isAdd) {
        this.$store.dispatch('updateFoodCount', {isAdd, food: this.food})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)

    .icon-offline_fill
      display: inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color $green
      &.move-enter-active, &.move-leave-active
        transition all .3s
      &.move-enter, &.move-leave-to
        opacity 0
        transform translateX(15px) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .icon-addition_fill
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color $green
</style>

