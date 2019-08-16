// 创建路由对象 及 配置路由规则 和 其他路由配置

import VueRouter from 'vue-router' // 导包(vue-router)
import Vue from 'vue'

import Login from '@/views/login' // 导入login组件

Vue.use(VueRouter) // 在全局使用

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login }
  ]
})
export default router
