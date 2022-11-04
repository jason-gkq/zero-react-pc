import React from "react";
import { connect } from "react-redux";
import { globalActions, globalSelectors } from "../redux";
import { AppConfigContext } from "./ConfigureContext";
import { paramToObject, isEmptyObject } from "../utils";
import { Modal } from "antd";
import type { IPageConfig, IModel } from "../types/zero";

type IPropsRegisterPageComponent = {
  dispatch: any;
  $route: any;
  $payload: any;
  checkLogin: Function;
  checkPermission: Function;
  user: any;
  permissions: string[];
};

type IStateRegisterPageComponent = {
  hasError: number | undefined;
  $route: string;
  $payload: any;
};

export default (pageConfig: IPageConfig, pageModel?: IModel) =>
  (WrappedComponent: any) => {
    const mapStateToProps = (state: any) => {
      const methods = globalSelectors.app.getMixinMethods(state);
      const user = globalSelectors.app.getUser(state);
      const permissions = globalSelectors.app.getPermissions(state);
      return {
        user,
        permissions,
        ...methods,
      };
    };
    class ContainerPage extends React.PureComponent<
      IPropsRegisterPageComponent,
      IStateRegisterPageComponent
    > {
      constructor(props: IPropsRegisterPageComponent, context: any) {
        super(props);
        const { pathname: $route, search } = window.location;
        const { usr: payload } = window.history.state;
        const $payload = paramToObject(search, payload);

        const { dispatch, checkLogin, checkPermission, user, permissions } =
          this.props;

        let { isNeedLogin } = context;
        if (Reflect.has(pageConfig, "isNeedLogin")) {
          isNeedLogin = pageConfig.isNeedLogin;
        }

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

        let checkPermissions;
        if (Reflect.has(pageConfig, "permissions")) {
          checkPermissions = pageConfig.permissions;
        }
        let hasError;
        if (checkPermissions) {
          const isPermissions =
            (checkPermission &&
              checkPermission(permissions, checkPermissions)) ||
            false;
          if (!isPermissions) {
            hasError = 403;
          }
        }

        this.state = {
          hasError,
          $route,
          $payload,
        };
        // const { pageId } = pageConfig || {};
        // dispatch(
        //   (globalActions as any).route.currentPage({
        //     pageId,
        //     route: $route,
        //     payload: $payload,
        //     // breadcrumb,
        //   })
        // );

        if (!pageModel || isEmptyObject(pageModel)) {
          return;
        }

        if (pageModel.initialize) {
          dispatch(pageModel.actions.initState());
        }
        pageModel.runSaga();
      }

      static getDerivedStateFromError(error: any) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: 505 };
      }

      componentDidCatch(error: any, errorInfo: any) {
        // 你同样可以将错误日志上报给服务器
        console.warn(
          "RegisterPageComponent-componentDidCatch-error, errorInfo::",
          error,
          errorInfo
        );
      }

      componentWillUnmount() {
        if (!pageModel || isEmptyObject(pageModel)) {
          return;
        }
        const { dispatch } = (this as any).props;
        if (pageModel.actions.willUnmount) {
          dispatch(
            pageModel.actions.willUnmount({
              done: () => {
                pageModel.cancelSaga();
              },
            })
          );
        } else {
          pageModel.cancelSaga();
        }
      }

      render() {
        const { dispatch, user, permissions, checkPermission, ...restProps } =
          this.props;
        const newCheck = checkPermission.bind(null, permissions);
        const { hasError, $route, $payload } = this.state;
        return (
          <WrappedComponent
            {...restProps}
            $hasError={hasError}
            $model={pageModel}
            $globalActions={globalActions}
            $globalSelectors={globalSelectors}
            $dispatch={dispatch}
            $route={$route}
            $payload={$payload}
            checkPermission={newCheck}
          />
        );
      }
    }
    ContainerPage.contextType = AppConfigContext;
    return connect(mapStateToProps)(ContainerPage) as typeof WrappedComponent;
  };
