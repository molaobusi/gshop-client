<template>
    <div id="app">
      <router-view/>
      <footer-guide v-show="$route.meta.showFooter"/>
    </div>
</template>

<script>
  import FooterGuide from "./components/footerGuide/FooterGuide";
  import {getFoodCategoryList} from "./api/index"
  export default {
    name: "App",
    components: {
      FooterGuide
    },
    async mounted() {
      const result = await getFoodCategoryList();
      console.log(result);
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
