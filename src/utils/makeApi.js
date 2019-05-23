import { pick, assign, isEmpty} from 'lodash'
import { message } from 'antd';
import { getRootUrl } from 'utils/helper';
import axios from 'axios';
class MakeApi {
  constructor(options) {
    this.api = {}
    const {
      config = {},
      apiData,
      requestSuccessCallback = this.requestSuccessCallback,
      requestFailCallback = this.requestFailCallback,
      responseSuccessCallback = this.responseSuccessCallback,
      responseFailCallback = this.responseFailCallback,
    } = options;
    this.axiosInstance = axios.create(config)
    this.axiosInstance.interceptors.request.use(requestSuccessCallback, requestFailCallback)
    this.axiosInstance.interceptors.response.use(responseSuccessCallback, responseFailCallback)
    this.apiBuilder(apiData)
  }
  apiBuilder(apiData=[]) {
    apiData.forEach(item => {
      this.apiSingleBuilder(item)
    })
  }
  apiSingleBuilder(options) {
    const { name, desc, params, method, path:url} = options
    const handleMethod = this.handleMethod;
    const axiosInstance = this.axiosInstance;
    Object.defineProperty(this.api, name, {
      value(outerParams, outerOptions) {
        // 请求参数自动截取。 请求参数不穿则发送默认配置参数。
        const data = isEmpty(outerParams) ? params : pick(assign({}, params, outerParams), Object.keys(params))
        return axiosInstance(handleMethod(assign({
          url,
          desc,
          method
        }, outerOptions), data))
      }
    })
  }
  // 处理请求方法
  handleMethod(options, data) {
    // 这里可以做大小写转换，也可以做其他类型 RESTFUl 的兼容
    if (options.method === 'POST') {
      options.data = data
    } else if (options.method === 'GET') {
      options.params = data
    }
    return options
  }
  // 请求成功
  requestSuccessCallback(requestObj) {
    return requestObj;
  }
  //请求错误 比如断网
  requestFailCallback(requestError) {
    return Promise.reject(requestError);
  }
  // 响应成功
  responseSuccessCallback(responseObj) {
    let { data } = responseObj;
    let code = data.code;
    switch (code) {
      case 200:
        return data.data;
      case 401:
        message.error("请登录!");
        window.location.href = `${getRootUrl()}/#/login`;
        return Promise.reject(data);
      default:
        let status = responseObj.config._code; //特殊code需要下发到业务方,就不用弹框提示
        if (responseObj.config.data) { //处理post请求方式的参数
          let data = JSON.parse(responseObj.config.data);
          status = data._code;
        }
        if (status && status instanceof Array) {
          if (status.includes(code)) {
            return Promise.reject(data);
          }
        }
        message.error(data.message);
        return Promise.reject(data);
    }
  }
  // 响应错误
  responseFailCallback(responseError) {
    message.error("服务器出错，请联系管理员!");
    return Promise.reject(responseError);
  }
}
export default MakeApi