<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" v-for="(starClass, index) in starClassArr" :class="starClass" :key="index"></span>
  </div>
</template>

<script>
  export default {
    name: 'Star',
    props: {
      score: Number,
      size: Number
    },
    computed: {
      starClassArr() {
        const {score} = this
        const starArr = [] // 保存星级class名称的数组，其中值为：on half off 三种类型
        // 评分取整
        const scoreInt = Math.floor(score)
        // 向数组中添加一颗星对应的class名称on
        for (let i = 0; i < scoreInt; i++) {
          starArr.push('on')
        }
        // 向数组中添加半颗星对应的class名称half
        if (score * 10 - scoreInt * 10 >= 5) {
          starArr.push('half')
        }
        // 向数组中添加灰色星对应的class名称off
        while (starArr.length < 5) {
          starArr.push('off')
        }

        return starArr
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
