<template>
    <div id="app">
      <router-view/>
      <footer-guide v-show="$route.meta.showFooter"/>
    </div>
</template>

<script>
  import FooterGuide from './components/footerGuide/FooterGuide'

  export default {
    name: 'App',
    components: {
      FooterGuide
    },
    mounted() {
      this.$store.dispatch('getUserInfo')
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
