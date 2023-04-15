import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import '../public/reset.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import global from './global.vue'

Vue.prototype.GLOBAL = global

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
