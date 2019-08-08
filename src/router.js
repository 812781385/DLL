import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

import Layout from './views/layout/Layout.vue'
// import Login from './views/login/Login.vue'
const dashboard = () =>
    import ('./views/dashboard/index.vue')
const bill = () =>
    import ('./views/bill/index.vue')

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
    {
        path: '',
        component: Layout,
        redirect: '/dashboard',
        meta: {
            name: '首页',
        },
        icon: 'homepage',
        children: [{
            path: 'dashboard',
            component: dashboard,
            meta: {
                name: '首页 ',
                role: ['Dashboard']
            },
        }],
    },
    {
        path: '/finance',
        component: Layout,
        redirect: 'finance/bill',
        meta: {
            name: '财务管理',
        },
        icon: 'financepage',
        children: [{
            path: 'bill',
            component: bill,
            meta: {
                name: '账单中心',
                role: ['bill']
            },
        }],
    }, {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ './views/About.vue')
    }, ]
})