import React from "react";
import { connect } from "react-redux";
import { globalActions, globalSelectors } from "../redux";
import { AppConfigContext } from "./ConfigureContext";
import { history } from "../api/navigate";
import { paramToObject, isEmptyObject } from "../utils";
import { Modal } from "antd";
import type { IPageConfig, IModel } from "../types/zero";

type IPropsRegisterPageComponent = {
  dispatch: any;
  $route: any;
  $payload: any;
  checkLogin: Function;
  user: any;
};

type IStateRegisterPageComponent = {
  hasError: boolean;
};

export default (pageConfig: IPageConfig, pageModel?: IModel) =>
  (WrappedComponent: any) => {
    const mapStateToProps = (state: any) => {
      const { checkLogin, ...methods } =
        globalSelectors.app.getMixinMethods(state);
      const user = globalSelectors.app.getUser(state);
      let { pathname: $route, state: payload, search } = history.location;
      const $payload = paramToObject(search, payload);
      return {
        $route,
        $payload,
        checkLogin,
        user,
        ...methods,
      };
    };
    class RegisterPageComponent extends React.PureComponent<
      IPropsRegisterPageComponent,
      IStateRegisterPageComponent
    > {
      constructor(props: IPropsRegisterPageComponent, context: any) {
        super(props);

        const { dispatch, $route, $payload, checkLogin, user } = this.props;

        this.state = {
          hasError: false,
        };

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
        return { hasError: true };
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
        if (pageModel.cache === false) {
          pageModel.removeReducer();
        }
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
        const { dispatch, user, ...restProps } = this.props;
        const { hasError } = this.state;
        return (
          <WrappedComponent
            {...restProps}
            $hasError={hasError}
            $model={pageModel}
            $globalActions={globalActions}
            $globalSelectors={globalSelectors}
            $dispatch={dispatch}
          />
        );
      }
    }
    RegisterPageComponent.contextType = AppConfigContext;
    return connect(mapStateToProps)(
      RegisterPageComponent
    ) as typeof WrappedComponent;
  };
