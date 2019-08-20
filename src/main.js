// main.js  职责1：依赖项目需要的资源(CSS资源,JS模块)
//  职责2：实例化根实例 render()  渲染APP组件 然后挂载到#app的容器内

import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui' // 导包(element-ui)
import 'element-ui/lib/theme-chalk/index.css' // 引入样式

// 在vue-cli创建的项目中，@ 前戳 代表的是根路径 src目录
// 默认会加载索引路径 可不用去写 （索引文件：index.js index.json）
import router from '@/router'

import axios from '@/api/axios.js'

// // 修改axios的默认选项
// // 基准路径
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// // 请求头
// axios.defaults.headers = {
//   // token认证需要的字段  值：注意需要加上前缀 'Bearer '
//   Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('fuxi_hmtt')).token
// }

Vue.prototype.$http = axios // 将axios挂载到vue原型上，以便于在全局使用

Vue.use(ElementUI) // 在全局范围注册组件库

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router // 挂载跟实例
}).$mount('#app')
