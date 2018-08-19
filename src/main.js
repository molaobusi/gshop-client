/**
 * 入口JS
 */
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App'
import router from './router/index'
import store from './store/index'

Vue.component(Button.name, Button);

(() => new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
  })
)()
