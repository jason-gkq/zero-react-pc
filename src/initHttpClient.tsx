import { cloneDeep, net } from "@/zero";
import { useToken } from "@/common/hooks";

const { getToken, removeToken } = useToken();

export default (
  REQUEST: Record<string, { baseURL: string; successCode: string }>,
  cb: () => Promise<any>
) => {
  net.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
    if (["post", "put", "patch"].includes(config.method)) {
      Object.assign(config.headers, {
        "Content-Type": "application/json;charset=utf-8",
      });
    }

    const { url } = config;
    if (
      String(url).startsWith("http://") ||
      String(url).startsWith("https://")
    ) {
      return config;
    }
    config["interceptInfo"] = REQUEST.BASE;
    config.baseURL = REQUEST.BASE.baseURL;
    if (url.includes(":")) {
      const [tempBase, tempUrl] = url.split(":");
      if (REQUEST[tempBase]) {
        config["interceptInfo"] = REQUEST[tempBase];
        config.baseURL = REQUEST[tempBase].baseURL;
      }
      config.url = tempUrl;
    }

    return config;
  });
  net.interceptors.response.use((resp) => {
    const {
      data,
      config: { interceptInfo },
    } = resp || {};
    if (!interceptInfo) {
      return Promise.resolve(resp);
    }
    const { successCode } = interceptInfo;
    const code = Object.is(data.code, undefined) ? 500 : Number(data.code);
    if (code === Number(successCode)) {
      return Promise.resolve(resp);
    }
    if ([401].includes(code)) {
      /**
       * 正常流程中接口返回需要登录则直接进入登录页面，由登录页面统一处理登录逻辑
       */
      return cb().then(() => {
        return Promise.reject({
          ...resp,
          data: { msg: data.msg || "用户未登录", code },
        });
      });
    }
    const cloneResp = cloneDeep(resp || {});
    let result = {
      msg: data.msg || data.desc || "服务器内部错误",
      code,
    };
    cloneResp["data"] = result;
    return Promise.reject(cloneResp);
  });
  return true;
};
