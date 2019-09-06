import MyBread from '@/components/my-bread.vue' // 导入 MyBread 组件

import MyChannel from '@/components/my-channel.vue' // 导入 MyChannel 组件

import MyImage from '@/components/my-image.vue' // 导入 MyImage 组件

import MyA from '@/components/my-a.vue' // 导入 MyA 组件
import MyB from '@/components/my-b.vue' // 导入 MyB 组件

// 封装成插件的形式，当使用 Vue.use(插件)时，执行插件的配置对象中的install函数，且传入Vue对象(不需要导入vue对象)
export default {
  install (Vue) {
    // 注册所有组件在Vue下  Vue.component(组件名，组件)
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImage.name, MyImage)
    Vue.component(MyA.name, MyA)
    Vue.component(MyB.name, MyB)
    // ..... 往下挨个注册其他组件
  }
}
