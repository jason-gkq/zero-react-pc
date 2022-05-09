import React, { useEffect, useState } from "react";
import ProCard from "@ant-design/pro-card";
import { Exception, Loading } from "@/zero/components";
import { navigate, HttpClient, localStorage } from "@/zero/api";
import { guid } from "@/zero/utils";
import { connect } from "react-redux";
import type { IProps } from "@/zero/types/zero";
import { useToken } from "@/src/common/hooks";

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
export default ({ $payload }: { $payload: Record<string, any> }) => {
  const [loginFlag, setLoginFlag] = useState(false);
  const { setToken, removeToken } = useToken();
  const { state, redirect } = $payload;
  // HttpClient.post(`login`, )
  //       .then((res: any) => {
  //         setToken(res.token);
  //         const { redirect = "/index" } = $payload || {};
  //         let redirectUrl = localStorage.get("redirect") || redirect;
  //         navigate.reload(decodeURIComponent(redirectUrl));
  //       })
  //       .catch((e) => {
  //         setLoginFlag(true);
  //       });
  useEffect(() => {
    // removeToken();
    setToken("eyJhbGciOiJIUzU");
    navigate.reload();
  }, []);

  return (
    <>
      <ProCard layout='center' style={{ height: "100vh" }}>
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
    </>
  );
};
