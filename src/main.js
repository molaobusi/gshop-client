/**
 * 入口JS
 */
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/index';

(() => new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
  })
)()
