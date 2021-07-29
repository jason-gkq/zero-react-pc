import React from "react";
import { store } from "../redux";
import { history, generateRoute } from "../navigate";
import "../style/index.less";

export default (appModel) => (WrappedComponent) => {
  class RegisterAppComponent extends React.Component {
    constructor(props) {
      super(props);
      /**
       * 初始化路由，并获取对应路由列表
       */
      const { state: onLunchPayload = {}, search = "" } = history.location;
      if (search) {
        search.split("&").reduce((onLunchPayload, v) => {
          if (v && v.includes("=")) {
            const temp = v.split("=");
            onLunchPayload[temp[0]] = temp[1];
          }
          return onLunchPayload;
        }, onLunchPayload);
      }
      const { env } = store.getState();
      const { routeList: $routes, fullRoutes: $fullRoutes } = generateRoute();
      this.state = {
        $onLunchPayload: onLunchPayload,
        $routes,
        $fullRoutes,
      };
      /**
       * 运行app中 saga
       */
      if (appModel.initialize) {
        store.dispatch(appModel.actions.initState());
      }
      appModel.runSaga();
    }

    componentDidMount() {
      /**
       * 添加事件监听
       */
      window.addEventListener("resize", function () {
        // if(window.innerWidth <= 800) {
        //     div.style.display = 'none';
        // } else {
        //     div.style.display = 'block';
        // }
      });
    }

    componentWillUnmount() {
      if (appModel.actions.willUnmount) {
        store.dispatch(
          appModel.actions.willUnmount({
            done: () => {
              appModel.cancelSaga();
            },
          })
        );
      } else {
        appModel.cancelSaga();
      }
    }
    render() {
      return (
        <WrappedComponent
          {...this.state}
          $store={store}
          $model={appModel}
          $history={history}
        />
      );
    }
  }

  return RegisterAppComponent;
};
