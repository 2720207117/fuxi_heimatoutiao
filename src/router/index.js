// 创建路由对象 及 配置路由规则 和 其他路由配置

import VueRouter from 'vue-router' // 导包(vue-router)
import Vue from 'vue'

import Login from '@/views/login' // 导入login 登录页 组件

import Home from '@/views/home' // 导入home 首页 组件

import Welcome from '@/views/welcome' // 导入welcome 欢迎页组件

import Publish from '@/views/publish' // 导入publish 发布文章组件

import NotFound from '@/views/404' // 导入404 404页面组件

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
    },
    // 路径走到这个位置，证明没有任何程序去处理这个路径
    { name: 'notfound', path: '*', component: NotFound }
  ]
})

// 注册一个全局的前置守卫
router.beforeEach((to, from, next) => {
  // 如果不去主动的触发，resolve(next下一步) 会一直等待
  // 判断登录状态
  // 首先获取token信息
  const user = window.sessionStorage.getItem('fuxi_hmtt')
  console.log(user)
  // 判断 (如果不是去登录页并且没有token就跳转到登录页)
  if (to.path !== '/login' && !user) {
    next('/login')
  } else {
    next()
  }
})
export default router
