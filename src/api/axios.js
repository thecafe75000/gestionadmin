import axios from 'axios'

const baseUrl = '/api'

// axios 二次封装的核心逻辑
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl 
  }

  getInsideConfig() {
    const config = {
      baseUrl: this.baseUrl,
      header:{}
    }
    return config
  }

  interceptors(instanceAx) {
    // 添加请求拦截器
    instanceAx.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        return config
      }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )

    // 添加响应拦截器
    instanceAx.interceptors.response.use(
      function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response
      },
      function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error)
      }
    )
  }

  request(options) {
    options = { ...this.getInsideConfig(), ...options }
    // 创建axios的实例
    const instance = axios.create()
    // 调用方法interception实现当前实例的拦截器
    this.interceptors(instance)
    return instance(options)
  }
}

const httpReq = new HttpRequest(baseUrl)

export default httpReq    