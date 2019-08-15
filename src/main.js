import Vue from 'vue'
import './directives.js'
import './plugins/axios'
import router from './router'
import store from './store'
import './plugins/element.js'
import App from './App.vue'

Vue.config.productionTip = false

// 路由守位
const whiteList = ['/login', '/register'];
router.beforeEach((to, from, next) => {
	let token = store.state.token;
	console.log(to)
	if (to.meta.requiresAuth && token) {
		console.log(token)
		next();
	} else {
		if (to.path === '/login') {
			next()
		} else {
			next('/login')
		}
	}
})

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')