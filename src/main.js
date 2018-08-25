/**
 * 入口JS
 */
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App'
import router from './router/index'
import store from './store/index'
import VueLazyload from 'vue-lazyload'

import './mock/mockServer' // 加载mockServer即可
import './filters/index' // 加载filters即可

Vue.component(Button.name, Button);
Vue.use(VueLazyload, {
  loading: '../static/images/loading.gif',
});

(() => new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
  })
)()
