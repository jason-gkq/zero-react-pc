import React from "react";
import { connect } from "react-redux";

import { globalActions, globalSelectors } from "../redux";

export default (pageModel) => (WrappedComponent) => {
  class TargetComponent extends WrappedComponent {
    constructor(props) {
      super(props);
    }

    // TODO: 登录、权限 判断
    componentDidMount() {
      const { $isNeedLogin, $isNeedPermission, dispatch, isLogin } = this.props;
      // 需要登录
      if ($isNeedLogin && !isLogin) {
        dispatch(globalActions.navigate.goTo({ url: "/login/index" }));
        return;
      }
      super.componentDidMount();
    }
  }

  @connect((state) => {
    const { pageStatus } = pageModel.selectors.getState(state);
    let {
      isNeedLogin: $isNeedLogin,
      isNeedPermission: $isNeedPermission,
    } = globalSelectors.app.getState(state);
    const { isLogin } = globalSelectors.getUser(state);

    if (Reflect.has(pageModel.config, "isNeedLogin")) {
      $isNeedLogin = pageModel.config.isNeedLogin;
    }
    if (Reflect.has(pageModel.config, "isNeedPermission")) {
      $isNeedPermission = pageModel.config.isNeedPermission;
    }
    return {
      $pageStatus: pageStatus,
      $isNeedLogin,
      $isNeedPermission,
      isLogin,
    };
  })
  class RegisterPageComponent extends React.Component {
    constructor(props) {
      super(props);

      const {
        dispatch,
        location: { pathname: path, state: payload },
      } = this.props;
      // console.log("this.props-->>", this.props);
      dispatch(
        globalActions.route.currentPage({
          pageId: pageModel.config.pageId,
          title: pageModel.config.title,
          path,
          payload,
        })
      );
      if (!pageModel) {
        return;
      }
      // if (!store.asyncReducers[pageModel.name]) {
      //   injectAsyncReducer(pageModel.name, pageModel.reducers);
      // }
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
      return (
        <TargetComponent
          {...this.props}
          $model={pageModel}
          $globalActions={globalActions}
          $globalSelectors={globalSelectors}
        />
      );
    }
  }
  return RegisterPageComponent;
};
