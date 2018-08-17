<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categoryArr.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys, index) in categoryArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category, index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImgUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="../../../static/images/msite_back.svg" alt="msite" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'

  import HeaderTop from '../../components/headerTop/HeaderTop'
  import ShopList from '../../components/shop/ShopList'
  import {mapState} from 'vuex'

  export default {
    name: 'Home',
    data() {
      return {
        baseImgUrl: 'https://fuss10.elemecdn.com'
      }
    },
    components: {
      HeaderTop,
      ShopList
    },
    mounted () {
      // 加载当前位置信息
      this.$store.dispatch('getAddress')
      this.$store.dispatch('getFoodCategoryList')
    },
    computed: {
      ...mapState(['address', 'categoryList']),
      // 将一维数组categoryList转换为二维数组arr
      categoryArr() {
        const arr = [] // 二维数组
        let minArr = [] // 第二层数组，长度最大为8

        const {categoryList} = this
        // 循环将一维数组categoryList转换为二维数组arr
        categoryList.forEach(category => {
          if (minArr.length === 8) {
            minArr = []
          }
          if (minArr.length === 0) {
            arr.push(minArr)
          }
          minArr.push(category)
        })

        return arr
      }
    },
    watch: {
      categoryList() {
        this.$nextTick(() => {
          new Swiper('.swiper-container', {
            loop: true,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px
</style>
