import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Modal } from "antd";
import { useLocation } from "react-router-dom";

import { Exception } from "../components";
import { AppConfigContext } from "./ConfigureContext";
import { globalActions, globalSelectors } from "../redux";
import { paramToObject } from "../utils";

interface IConfig {
  isNeedLogin?: boolean;
}

interface IPageConfig extends IConfig {
  pageId: string;
  permissions?: string[];
}

interface IModel {
  namespace: string;
  initialize: boolean;
  selectors: any;
  actions: any;
  reducers: any;
  _sagaTask: any;
  removeReducer?: Function;
  runSaga: Function;
  cancelSaga: Function;
}

type IPropsPageComponent = {
  dispatch: any;
  $route: any;
  $payload: any;
  checkLogin: Function;
  checkPermission: Function;
  user: any;
  permissions: string[];
};

// type IStateRegisterPageComponent = {
//   hasError: number | undefined;
//   $route: string;
//   $payload: any;
// };

const createPage = (
  pageConfig: IPageConfig,
  WrappedComponent: any,
  pageModel?: IModel
) => {
  return connect((state: any) => {
    const methods = globalSelectors.app.getMixinMethods(state);
    const user = globalSelectors.app.getUser(state);
    const permissions = globalSelectors.app.getPermissions(state);
    return {
      user,
      permissions,
      ...methods,
    };
  })(
    ({
      dispatch,
      checkLogin,
      checkPermission,
      user,
      permissions,
    }: IPropsPageComponent) => {
      const { pathname: $route, state: payload, search } = useLocation();
      const $payload = paramToObject(search, payload);
      const [hasError, setHasError] = useState<number>(0);
      const newCheck = checkPermission.bind(null, permissions);

      let { isNeedLogin } = useContext<IConfig>(AppConfigContext);
      if (Reflect.has(pageConfig, "isNeedLogin")) {
        isNeedLogin = pageConfig.isNeedLogin;
      }
      let checkPermissions: string[] = [];
      if (Reflect.has(pageConfig, "permissions")) {
        checkPermissions = pageConfig.permissions || [];
      }

      useEffect(() => {
        if (isNeedLogin) {
          const isLogin = (checkLogin && checkLogin(user)) || false;
          if (!isLogin) {
            Modal.error({
              title: "未登录",
              content: "请先进行登录！",
              okText: "去登录",
              onOk: () => {
                dispatch(
                  (globalActions as any).app.logout({ $route, $payload })
                );
              },
            });
          }
        }
      }, [isNeedLogin, $route, JSON.stringify($payload)]);

      useEffect(() => {
        if (checkPermissions && checkPermissions.length > 0) {
          const isPermissions =
            (checkPermission &&
              checkPermission(permissions, checkPermissions)) ||
            false;
          if (!isPermissions) {
            // hasError = 403;
            setHasError(403);
          }
        }
      }, [JSON.stringify(checkPermissions)]);

      useEffect(() => {
        /**
         * 前置执行 onReady 方法；
         */
        if (pageModel && pageModel.actions.onReady) {
          // setTimeout(() => {
          /* 传入页面options 即可： this.props.location.state */
          dispatch(pageModel.actions.onReady($payload));
          // }, 0);
        }
      }, [pageModel, JSON.stringify($payload)]);
      return (
        <>
          {hasError ? (
            <Exception code={hasError} />
          ) : (
            <WrappedComponent
              $hasError={hasError}
              $model={pageModel}
              $globalActions={globalActions}
              $globalSelectors={globalSelectors}
              $dispatch={dispatch}
              $route={$route}
              $payload={$payload}
              checkPermission={newCheck}
            />
          )}
        </>
      );
    }
  );
};

export default createPage;
