// 创建路由对象 及 配置路由规则 和 其他路由配置

import VueRouter from 'vue-router' // 导包(vue-router)
import Vue from 'vue'

import Login from '@/views/login' // 导入login 登录页 组件

import Home from '@/views/home' // 导入home 首页 组件

import Welcome from '@/views/welcome' // 导入welcome 欢迎页组件

import Publish from '@/views/publish' // 导入publish 发布文章组件

Vue.use(VueRouter) // 在全局使用

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    { path: '/',
      component: Home,
      children: [
        {
          name: 'welcome',
          path: '/',
          component: Welcome
        },
        {
          name: 'publish',
          path: '/publish',
          component: Publish
        }
      ]
    }
  ]
})
export default router
