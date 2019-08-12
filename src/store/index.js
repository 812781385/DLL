import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		marginLeft: '150px',
	},
	mutations: {
		SET_MARGIN_LEFT: (state, value) => {
			state.marginLeft = value
		},
	},
	actions: {
		setMarginLeft({
			commit
		}, value) {
			commit('SET_MARGIN_LEFT', value)
		}
	}
})