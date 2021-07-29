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
import { guid, cloneDeep } from "../utils/util";
import cookieStorage from "../cache/cookieStorage";
import navigate from "../navigate/configureNavigate";

/* 不跳转登录页面白名单 */
const loginWhiteListUrl = [
  "/gateway/user/currentUser",
  "/gateway/user/smsLogin",
];

/**
 * 正在进行中的请求
 */
const pending = {};

let interceptorsFlag = true;
/**
 * 用于重复请求取消操作，只取消请求中还未完成的请求
 */
const CancelToken = axios.CancelToken;
/**
 * 初始化公共参数
 */
let commonData = {};

/**
 * 执行取消重复请求操作
 * @param {*} key
 * @param {*} isRequest
 */
const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]("取消重复请求");
  }
  delete pending[key];
};
/**
 * config: 请求数据
 * isReuest: 请求拦截器中 config.url = '/users', 响应拦截器中 config.url = 'http://localhost:3000/users'，所以加上一个标识来计算请求的全路径
 */
const getRequestIdentify = (config, isReuest = false) => {
  let url = config.url;
  if (isReuest) {
    url = config.baseURL + config.url.substring(1, config.url.length);
  }
  let data =
    config.method === "get" ? cloneDeep(config.params) : cloneDeep(config.data);
  if (data.__requestId) {
    Reflect.deleteProperty(data, "__requestId");
  }
  return encodeURIComponent(url + JSON.stringify(data));
};
/**
 * 初始化公共参数
 */
const initCommonData = (env) => {
  commonData = {
    appCode: Number(env.appCode),
    version: env.version,
    __cleintId: env.__clientId,
    parentSessionId: env.parentSessionId,
    sessionId: env.sessionId,
  };
};
/**
 * 更新公共参数
 * @param {*} param0
 */
export const setCommonData = ({
  SERVICE_URL: baseURL,
  appCode,
  groupId,
  groupType,
}) => {
  if (baseURL && !["prod", "pre"].includes(process.env.productConfig.ENV)) {
    axios.defaults.baseURL = baseURL;
  }
  appCode && (commonData.appCode = appCode);
  groupId && (commonData.groupId = groupId);
  groupType && (commonData.groupType = groupType);
};
/**
 * 获取请求公共参数
 * @returns
 */
const getCommonData = () => {
  return Object.assign(commonData, {
    __requestId: guid(),
    token: cookieStorage.getItem("token"),
  });
};

/**
 * 组装 X-Request-Info
 * @param {*} data
 * @returns
 */
const getXRequestInfo = (data) => {
  let baseInfo = "";
  let xRequestInfo = Object.entries(data).reduce((baseInfo, [key, value]) => {
    return baseInfo ? `${baseInfo};${key}=${value}` : `${key}=${value}`;
  }, baseInfo);
  return xRequestInfo;
};
/**
 * 请求拦截器，如果相同请求已经在进行，则取消后续相同请求
 * 且只对传入参数进行计算，公共参数以及 __requestId 不能进入计算逻辑
 * @param {*} config
 * @returns
 */
const requestHandler = () => {
  return (config) => {
    const commonData = getCommonData();
    const xRequestInfo = getXRequestInfo(commonData);
    /**
     * 如果是 post 添加乐车邦公共请求参数
     */
    if (config.method === "post") {
      config.data = Object.assign({}, config.data, commonData);
      config.headers = Object.assign({}, config.headers, {
        "X-Request-Info": xRequestInfo,
      });
    }
    // 拦截重复请求(即当前正在进行的相同请求)
    let requestData = getRequestIdentify(config, true);
    removePending(requestData, true);
    /**
     * 赋值取消请求方法
     */
    config.cancelToken = new CancelToken((c) => {
      pending[requestData] = c;
    });
    return config;
  };
};

const requestErrorHandler = (error) => {
  return Promise.reject(error);
};
/**
 * 请求返回拦截器
 * @param {*} resp
 * @returns
 */
const responseHandler = (resp) => {
  // 把已经完成的请求从 pending 中移除
  let requestData = getRequestIdentify(resp.config);
  removePending(requestData);

  const { data, status } = resp || {};
  const statusCode = Number(data.statusCode || 500);
  if (status && status === 200 && statusCode && statusCode === 200) {
    return Promise.resolve(data["result"]);
  }
  /**
   * 正常流程中 status 不等于200 不会走这里
   */
  if (status && status !== 200) {
    return Promise.reject({
      msg: "接口不存在，或服务在重启",
      statusCode: status,
      status,
    });
  }
  let url = resp.config.url;
  if (
    [904, 907, 8800111].includes(statusCode) &&
    !loginWhiteListUrl.includes(url)
  ) {
    // 登录跳转，注意排除loginWhiteListUrl
    const location =
      navigate.navigateHistory.length > 0
        ? navigate.navigateHistory[navigate.navigateHistory.length - 1]
        : { pathname: "/index/index", state: {} };
    navigate.redirect({
      url: location.pathname.endsWith("/common/login/index")
        ? `/common/login/index?to=${encodeURIComponent("/index/index")}`
        : `/common/login/index?to=${encodeURIComponent(location.pathname)}`,
      payload: location.state,
    });
  }
  let result = {
    msg: "服务器内部错误",
    statusCode,
  };
  if (data.hasOwnProperty("msg")) {
    result.msg = data.msg;
  }
  return Promise.reject(result);
};

// 网络异常拦截器
const responseErrorHandler = (resp) => {
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
      statusCode: status,
    });
  }
  /**
   * 重复请求，错误封装
   */
  if (resp.toString() && resp.toString().startsWith("Cancel:")) {
    return Promise.reject({
      msg: resp.message || "",
      statusCode: 410,
    });
  } //Error: Network Error
  if (resp.toString() && resp.toString().startsWith("Error: Network Error")) {
    return Promise.reject({
      msg: "未可知错误，大部分是由于后端不支持CORS或无效配置引起",
      statusCode: 404,
    });
  }
  if (resp && resp.message) {
    return Promise.reject({
      msg: resp.message || "",
      statusCode: 410,
    });
  }
  return Promise.reject({
    msg: msg || "未可知错误，大部分是由于后端不支持CORS或无效配置引起",
    statusCode: status || 403,
  });
};

export function setAxiosToken(token) {
  axios.defaults.headers.common["Authorization"] = token;
}
/**
 * 设置请求基本参数
 */
export function setAxiosBase(env) {
  /**
   * 重复注册拦截器
   */
  if (interceptorsFlag) {
    initCommonData(env);
    interceptorsFlag = false;
    axios.defaults.baseURL = env.SERVICE_URL || process.env.SERVICE_URL;
    axios.defaults.headers.post["Accept"] = "*/*";
    axios.defaults.headers.post["Content-Type"] = "application/json";

    axios.defaults.timeout = 10000;
    axios.defaults.withCredentials = true;

    axios.interceptors.request.use(requestHandler(), requestErrorHandler);
    axios.interceptors.response.use(responseHandler, responseErrorHandler);
  }
}

const getInstance = () => {
  // const commonData = getCommonData();

  const instance = axios.create();

  // instance.interceptors.response.use(responseHandler, errorHandler);
  return instance;
};

// export default setAxiosBase;  fetch
export const instance = getInstance();
