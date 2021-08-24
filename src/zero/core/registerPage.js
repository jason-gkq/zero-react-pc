import React from "react";
import { connect } from "react-redux";
import { globalActions, globalSelectors } from "../redux";
import { guardRoute } from "../route";
import { AppConfigContext } from "./configureContext";

export default (pageModel) => (WrappedComponent) => {
  const mapStateToProps = (state, { location }) => {
    const { pageStatus } = pageModel.selectors.getState(state);
    const { isLogin: $isLogin } = globalSelectors.getUser(state);
    const { appName } = globalSelectors.getEnv(state);
    const { pathname: $route, state: $payload = {} } = location;

    return {
      pageStatus,
      $route,
      $payload,
      $isLogin,
      appName,
    };
  };

  class RegisterPageComponent extends React.Component {
    constructor(props, context) {
      super(props);

      const { dispatch, $route, $payload, $isLogin, appName } = this.props;

      this.state = {
        hasError: false,
      };

      let { isNeedLogin, isNeedPermission, title } = context;
      if (pageModel.config && Reflect.has(pageModel.config, "isNeedLogin")) {
        isNeedLogin = pageModel.config.isNeedLogin;
      }
      if (
        pageModel.config &&
        Reflect.has(pageModel.config, "isNeedPermission")
      ) {
        isNeedPermission = pageModel.config.isNeedPermission;
      }
      if (pageModel.config && Reflect.has(pageModel.config, "title")) {
        title = pageModel.config.title;
      }
      document.title = title;
      if (isNeedPermission && !guardRoute($route)) {
        dispatch(globalActions.navigate.goBack());
        return;
      }
      const { pageId, breadcrumb } = pageModel.config || {};
      dispatch(
        globalActions.route.currentPage({
          pageId,
          title,
          route: $route,
          payload: $payload,
          breadcrumb,
        })
      );
      /* 判断登录跳转 */
      if (isNeedLogin && !$isLogin) {
        dispatch(
          globalActions.navigate.redirect({
            url: $route.endsWith("/common/login")
              ? `/${appName}/common/login?to=${encodeURIComponent(
                  `/${appName}/index`
                )}`
              : `/${appName}/common/login?to=${encodeURIComponent($route)}`,
            payload: $payload,
          })
        );
        return;
      }
      if (!pageModel) {
        return;
      }

      if (pageModel.initialize) {
        dispatch(pageModel.actions.initState());
      }

      pageModel.runSaga();
    }

    componentDidMount() {
      if (!pageModel) {
        return;
      }
    }

    static getDerivedStateFromError(error) {
      // 更新 state 使下一次渲染能够显示降级后的 UI
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // 你同样可以将错误日志上报给服务器
      console.warn("error, errorInfo>>>>", error, errorInfo);
    }

    componentWillUnmount() {
      if (!pageModel) {
        return;
      }
      const { dispatch } = this.props;
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
      const { pageStatus, appName, ...restProps } = this.props;
      const { hasError } = this.state;
      const $pageStatus = hasError ? "error" : pageStatus;
      return (
        <WrappedComponent
          {...restProps}
          $pageStatus={$pageStatus}
          $guardRoute={guardRoute}
          $model={pageModel}
          $globalActions={globalActions}
          $globalSelectors={globalSelectors}
        />
      );
    }
  }
  RegisterPageComponent.contextType = AppConfigContext;
  return connect(mapStateToProps)(RegisterPageComponent);
};
