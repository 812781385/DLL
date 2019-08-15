import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		marginLeft: '150px',
		token: localStorage.getItem('X-Ivanka-Token') || '',
		username: localStorage.getItem('username') || '',
		useravatar: localStorage.getItem('useravatar') || '',
	},
	mutations: {
		SET_MARGIN_LEFT: (state, value) => {
			state.marginLeft = value
		},
		SET_USER_NAME: (state, value) => {
			state.username = value
		},
		SET_USER_AVATAR: (state, value) => {
			state.useravatar = value
		},
		SET_TOKEN: (state, value) => {
			state.token = value
		},
	},
	actions: {
		setMarginLeft({
			commit
		}, value) {
			commit('SET_MARGIN_LEFT', value)
		},

		// login
		Login({
			commit
		}, users) {
			localStorage.setItem('X-Ivanka-Token', users.token);
			localStorage.setItem('username', users.userInfo.username);
			localStorage.setItem('useravatar', users.userInfo.avatar);
			commit('SET_USER_NAME', users.userInfo.username);
			commit('SET_USER_AVATAR', users.userInfo.avatar);
			commit('SET_TOKEN', users.token);
		},

		// logout
		Logout({
			commit
		}) {
			localStorage.setItem('X-Ivanka-Token', '');
			localStorage.setItem('username', '');
			localStorage.setItem('useravatar', '');
			commit('SET_USER_NAME', '');
			commit('SET_USER_AVATAR', '');
			commit('SET_TOKEN', '');
		}
	}
})