// main.js  职责1：依赖项目需要的资源(CSS资源,JS模块)
//  职责2：实例化根实例 render()  渲染APP组件 然后挂载到#app的容器内

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
