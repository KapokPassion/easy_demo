import Vue from 'vue'
import VueRouter from 'vue-router'
import loginRegister from '../views/loginRegister.vue'
import home from '../views/home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path:'/',
		redirect: '/login'
	},
  {
	  path:'/login',
	  component: loginRegister
  },
  {
  	  path:'/home',
  	  component: home
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
