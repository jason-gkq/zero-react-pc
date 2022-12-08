import React, { useEffect, useState } from "react";
import { ProCard, ProForm, ProFormText } from "@ant-design/pro-components";
import {
  Exception,
  Loading,
  navigate,
  HttpClient,
  localStorage,
  useEnv,
  guid,
} from "@/zero";
import { useToken } from "@/common/hooks";

/**
 * 如果有 token
 *  则无需登录，直接浏览器刷新项目replace到首页
 * 如果无 token
 *  如果有 hasLogin 和 code
 *    则进行登录接口调用换取token，存储token
 *      如果有redirectURL 则浏览器刷新并replace到对应页面
 *      如果没有redirectURL 则浏览器刷新并replace到首页
 *  如果无 hasLogin 和 code
 *    则直接跳转到sso进行登录
 *
 * @param props
 * @returns
 */
export default (props: any) => {
  const {
    $payload: { code, hasLogin, state, redirect = "/index/index" },
  } = props;
  const { ssoLoginUrl } = useEnv();
  const [loginFlag, setLoginFlag] = useState(false);
  const { setToken, removeToken } = useToken();
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      return;
    }
    if (code && hasLogin) {
      removeToken();
      const uuid = state || guid();
      HttpClient.post(`login?code=${code}&uuid=${uuid}`, { code, uuid })
        .then((res: any) => {
          setToken(res.token);
          const redirectUrl = localStorage.get("redirect") || redirect;
          navigate.reload(decodeURIComponent(redirectUrl));
          localStorage.remove("redirect");
        })
        .catch((e) => {
          setLoginFlag(true);
        });
      return;
    } else {
      localStorage.set("redirect", redirect);
      navigate.redirect(`${ssoLoginUrl}${guid()}`);
      return;
    }
  }, []);

  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <ProCard layout="center" style={{ height: "100vh" }}>
          <ProForm
            onFinish={async (values) => {
              const { localToken } = values;
              setToken(localToken);
              const redirectUrl = redirect;
              navigate.reload(redirectUrl);
            }}
          >
            <ProFormText
              name={"localToken"}
              label="Token"
              extra="测试环境则填写测试环境token；mock则填写随机字符串即可；"
              formItemProps={{
                rules: [{ required: true, message: "必填" }],
              }}
            />
          </ProForm>
        </ProCard>
      )}
      {process.env.NODE_ENV != "development" && (
        <ProCard layout="center" style={{ height: "100vh" }}>
          {loginFlag ? (
            <Exception
              onClick={() => {
                navigate.reload();
              }}
            />
          ) : (
            <Loading msg={"用户登录中"} />
          )}
        </ProCard>
      )}
    </>
  );
};
