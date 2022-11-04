/**
 * http://axios-js.com/zh-cn/docs/index.html
 * https://www.kancloud.cn/yunye/axios/234845#handling-errors
 * https://github.com/axios/axios#axios-api
 *
 * https://blog.csdn.net/Gomeer/article/details/89030650
 * https://segmentfault.com/a/1190000016457844
 * https://blog.csdn.net/qiushisoftware/article/details/80158593
 */
import axios, { Cancel } from "axios";
import type { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";
import { cloneDeep } from "../../utils";

/**
 * 正在进行中的请求
 */
const pending: Record<string, any> = {};

/**
 * 用于重复请求取消操作，只取消请求中还未完成的请求
 */
const CancelToken = axios.CancelToken;

let logList: Record<string, any> = {};
let costTimeLog: Record<string, any> = {};
/**
 * 执行取消重复请求操作
 * @param {*} key
 * @param {*} isRequest
 */
const removePending = (key: string, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]("取消重复请求");
  } else {
    delete pending[key];
  }
};
/**
 * config: 请求数据
 * isReuest: 请求拦截器中 config.url = '/users', 响应拦截器中 config.url = 'http://localhost:3000/users'，所以加上一个标识来计算请求的全路径
 */
const getRequestIdentify = (config: AxiosRequestConfig, isReuest = false) => {
  const url: string = config.url || "";
  const method: string = config.method || "";
  let data: any = {};
  if (["post", "put", "patch"].includes(method) && config.data) {
    data = isReuest
      ? cloneDeep(config.data)
      : JSON.parse(cloneDeep(config.data));
  }
  if (method === "get" && config.params) {
    data = cloneDeep(config.params);
  }
  return encodeURIComponent(url + method + JSON.stringify(data));
};

type Handler<V> = {
  fulfilled: (value: V) => V | Promise<V>;
  rejected?: (error: any) => any;
};
class InterceptorManager<V> {
  public handlers: Handler<V>[] = [];

  /**
   * 增加请求或返回的拦截器，多个拦截器按顺序执行
   * @param fulfilled 拦截器处理的函数
   * @param rejected Promise中失败的回调，一般只用在reponse拦截器中
   */
  public use(fulfilled: (value: V) => V, rejected?: any) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected,
    });
    return this.handlers.length - 1;
  }
}

class Net {
  /**
   * 请求的拦截器配置
   */
  interceptors: {
    request: InterceptorManager<any>;
    response: InterceptorManager<any>;
  };
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({ timeout: 15000 }); // , withCredentials: true
    this.instance.interceptors.request.use(
      this.requestHandler(),
      this.requestErrorHandler
    );
    this.instance.interceptors.response.use(
      this.responseHandler,
      this.responseErrorHandler
    );
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    };
  }

  setRequest = (config: {
    headers?: { [key: string]: any };
    baseURL?: string;
    timeout?: number;
  }) => {
    const { headers, baseURL, timeout } = config;
    if (baseURL) {
      this.instance.defaults.baseURL = baseURL;
    }
    if (timeout) {
      this.instance.defaults.timeout = timeout;
    }
    if (headers) {
      Object.assign(this.instance.defaults.headers.common, headers);
    }
  };

  /**
   * 请求拦截器，如果相同请求已经在进行，则取消后续相同请求
   * 且只对传入参数进行计算，公共参数以及 __requestId 不能进入计算逻辑
   * @param {*} config
   * @returns
   */
  requestHandler = () => {
    return async (config: AxiosRequestConfig) => {
      if (config.method && config.method === "options") {
        return config;
      }
      // 拦截重复请求(即当前正在进行的相同请求)
      let requestData = getRequestIdentify(config, true);
      removePending(requestData, true);
      costTimeLog[requestData] = Date.now();
      // config["withCredentials"] = true;
      /**
       * 执行request - request拦截器
       *
       */
      // 加入拦截器机制，请求拦截可以修改请求的配置，注：是在生成taro的request参数之前
      let promise: Promise<AxiosRequestConfig> = Promise.resolve(config);
      for (let interceptor of this.interceptors.request.handlers) {
        config = await promise.then<any, any>(
          interceptor.fulfilled,
          interceptor.fulfilled
        );
      }
      if (process.env.NODE_ENV === "development") {
        logList[requestData] = {
          "request：": config,
          "请求地址：": config.baseURL,
          "接口名称：": config.url,
          "请求方法：": config.method,
          "请求数据：": config.params || config.data,
        };
      }
      // 慢接口测试
      // if (config.url === "getUserInfo") {
      //   await new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       resolve(0);
      //     }, 5000);
      //   });
      // }
      /**
       * 赋值取消请求方法
       */
      config.cancelToken = new CancelToken((c) => {
        pending[requestData] = c;
      });
      return config;
    };
  };

  requestErrorHandler = (error: any) => {
    return Promise.reject(error);
  };
  /**
   * 请求返回拦截器
   * @param {*} resp
   * @returns
   */
  responseHandler = async (resp: AxiosResponse) => {
    if (resp.config.method && resp.config.method === "options") {
      return resp;
    }
    // 把已经完成的请求从 pending 中移除
    let requestData = getRequestIdentify(resp.config);
    removePending(requestData);

    // 执行返回拦截器，如果有多个拦截器则顺序执行
    let promise: Promise<AxiosResponse> = Promise.resolve(resp);
    let newData: AxiosResponse = resp;
    let errorData: any = null;
    for (let interceptor of this.interceptors.response.handlers) {
      try {
        newData = await promise.then<any, any>(
          interceptor.fulfilled,
          interceptor.rejected
        );
      } catch (error) {
        errorData = error as AxiosResponse;
      }
    }
    let costTime;
    if (costTimeLog[requestData]) {
      costTime = Date.now() - costTimeLog[requestData];
      delete costTimeLog[requestData];
      if (Object.keys(costTimeLog).length > 100) {
        costTimeLog = {};
      }
    }
    if (process.env.NODE_ENV === "development" && logList[requestData]) {
      this.consoleGroup(
        `--- 接口请求 ${logList[requestData]["接口名称："]} ---`,
        Object.assign({}, logList[requestData], {
          "返回数据：": (errorData && errorData.data) || newData.data,
          "请求耗时：": `${costTime}ms`,
        })
      );
      delete logList[requestData];
      if (Object.keys(logList).length > 100) {
        logList = {};
      }
    }
    if (errorData) {
      return Promise.reject(Object.assign({}, errorData.data, { costTime }));
    }
    return Promise.resolve(Object.assign({}, newData.data, { costTime }));
  };

  consoleGroup = (title: string, msgs: any) => {
    if (msgs) {
      console.groupCollapsed(title);
      for (let i in msgs) {
        console.log(i, msgs[i]);
      }
      console.groupEnd();
    }
  };

  // 网络异常拦截器
  responseErrorHandler = (resp: any) => {
    const { status } = (resp && resp.response) || {};
    if (status) {
      let msg;
      switch (status) {
        case 400:
          msg = "错误请求";
          break;
        case 401:
          msg = "未授权，请重新登录";
          break;
        case 403:
          msg = "拒绝访问";
          break;
        case 404:
          msg = "请求错误,未找到该资源";
          break;
        case 405:
          msg = "请求方法未允许";
          break;
        case 408:
          msg = "请求超时";
          break;
        case 500:
          msg = "服务器端出错";
          break;
        case 501:
          msg = "网络未实现";
          break;
        case 502:
          msg = "网络错误";
          break;
        case 503:
          msg = "服务不可用";
          break;
        case 504:
          msg = "网络超时";
          break;
        case 505:
          msg = "http版本不支持该请求";
          break;
        default:
          msg = `连接错误${status}`;
      }
      return Promise.reject({
        msg,
        code: status,
      });
    }
    /**
     * 重复请求，错误封装
     */
    if (resp.toString() && resp.toString().startsWith("Cancel:")) {
      return Promise.reject({
        msg: resp.message || "",
        code: 410,
      });
    } //Error: Network Error
    if (resp.toString() && resp.toString().startsWith("Error: Network Error")) {
      return Promise.reject({
        msg: "未可知错误，大部分是由于后端不支持CORS或无效配置引起",
        code: 404,
      });
    }
    if (resp && resp.message) {
      return Promise.reject({
        msg: resp.message || "",
        code: 410,
      });
    }
    return Promise.reject({
      msg:
        resp.message || "未可知错误，大部分是由于后端不支持CORS或无效配置引起",
      code: status || 403,
    });
  };
}

const net = new Net();
const HttpClient = net.instance;
export { net, HttpClient };
