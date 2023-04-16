import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import '../public/reset.css'
import {Table, Button, Input, TableColumn} from 'element-ui';
import global from './global.vue'

Vue.prototype.GLOBAL = global

Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Table);
Vue.use(Button);
Vue.use(Input);
Vue.use(TableColumn);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
