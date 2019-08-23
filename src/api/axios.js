// 封装axios
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/'
//   headers: { // 配置默认选项 将获取到的token信息添加到请求头 (但是 如果token失效，或者token不存在 直接获取添加会报错 解决：请求拦截器)
//     Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('fuxi_hmtt')).token
//   }
})

instance.interceptors.request.use(config => {
  // config 请求配置对象
  // 修改config
  const user = window.sessionStorage.getItem('fuxi_hmtt')
  // console.log(user)
  if (user) { // 如果获取到了token信息 就配置到请求头  (如果token信息失效或没有时，直接获取会报错 导致页面加载不出)
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, error => {
  // 创建promise对象的方式 new Promise() 结果肯成功 可能失败
  // Promise.resolve()  创建一个成功的promise
  // Promise.reject()   创建一个失败的promise
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response
}, error => {
  // 做自己的事情，错误的时候
  // 如果响应状态码是401 拦截到登录页面
  // error.response.status  状态码
  if (error.response.status === 401) {
    // hash 是location 提供获取操作 地址栏的#后
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
