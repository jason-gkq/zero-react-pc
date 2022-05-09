import { Modal } from "antd";
import { net, navigate, sessionStorage } from "@/zero/api";
import { cloneDeep } from "@/zero/utils";
import { useToken } from "@/common/hooks";

export default (
  REQUEST: Record<string, { baseURL: string; successCode: string }>
) => {
  net.interceptors.request.use((config) => {
    const { getToken } = useToken();
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
    const { successCode } = interceptInfo;
    const code = Object.is(data.code, undefined) ? 500 : Number(data.code);
    if (code === Number(successCode)) {
      return Promise.resolve(resp);
    }
    if ([401].includes(code)) {
      /**
       * 正常流程中接口返回需要登录则直接进入登录页面，由登录页面统一处理登录逻辑
       * 因为是sso，则根据以前系统逻辑直接跳转到sso登录页
       */
      const { removeToken } = useToken();
      removeToken();
      sessionStorage.clearAll();
      Modal.error({
        title: "未登录",
        content: "请先进行登录！",
        okText: "去登录",
        onOk: () => {
          navigate.redirect("/login");
        },
      });
      return Promise.reject({
        msg: data.msg || "用户未登录",
        code,
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
