import React from "react";
import { Provider } from "react-redux";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "../api/navigate/history";
import { store as $store } from "../redux";
import { PageLoading } from "../components";
import ContextComponent from "./ConfigureContext";
import RoutesComponent from "./RoutesComponent";
import useGlobalError from "./useGlobalError";
import { paramToObject } from "../utils";
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

import "../style/index.less";

import type { IConfig, IModel } from "../types/zero";

let unsubscribe: Function;
/**
 * 1. 初始化store
 * 2. 初始化路由
 * 3. 初始化layout
 * 4. 定义项目入口
 * 5. 添加全局错误监听
 */
export default (appConfig: IConfig, appModel: IModel) =>
  (WrappedComponent: any) => {
    class RegisterComponent extends WrappedComponent {
      constructor(props: any) {
        super(props);
        this.state = {
          appStatus: "loading",
          errorInfo: {},
        };
        /**
         * 运行app中 saga
         */
        appModel.initialize && $store.dispatch(appModel.actions.initState());
      }

      componentDidMount() {
        useGlobalError();
        moment.locale("zh-cn");
        unsubscribe = $store.subscribe(() => {
          const {
            app: { appStatus, errorInfo },
          } = $store.getState();
          if (appStatus && appStatus !== "loading") {
            this.setState({
              appStatus,
              errorInfo,
            });
          }
          if (appStatus === "finish") {
            unsubscribe();
          }
        });
        let { pathname: $route, state: payload, search } = history.location;
        const $payload = paramToObject(search, payload);

        $store.dispatch(
          appModel.actions.onLunch({ $route, $payload, ...appConfig })
        );
        if (super.componentDidMount) {
          super.componentDidMount();
        }
      }

      componentWillUnmount() {
        unsubscribe && unsubscribe();
        if (super.componentWillUnmount) {
          super.componentWillUnmount();
        }
      }

      renderContent() {
        const { appStatus, errorInfo } = this.state;

        switch (appStatus) {
          case "loading":
            return (
              <div
                style={{
                  height: "100vh",
                }}
              >
                <PageLoading />
              </div>
            );
          default:
            return (
              <HistoryRouter history={history as any}>
                <RoutesComponent errorInfo={errorInfo} />
              </HistoryRouter>
            );
        }
      }

      render() {
        return (
          <Provider store={$store}>
            <ContextComponent locale={zhCN} appConfig={appConfig}>
              {this.renderContent()}
            </ContextComponent>
          </Provider>
        );
      }
    }
    return RegisterComponent as typeof WrappedComponent;
  };
