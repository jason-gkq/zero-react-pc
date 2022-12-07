import React, { useEffect, useMemo } from "react";
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
import { useMergeState } from "../api";
import "../style/index.less";

interface IConfig {
  isNeedLogin?: boolean;
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

const createApp = (appConfig: IConfig, appModel: IModel) => {
  console.log(appConfig, appModel);

  return () => {
    const [state, setState] = useMergeState({
      appStatus: "loading",
      errorInfo: {},
    });

    let { pathname: $route, state: payload, search } = history.location;
    const $payload = paramToObject(search, payload);

    const { appStatus, errorInfo } = state;
    useEffect(() => {
      useGlobalError();
      moment.locale("zh-cn");
      appModel.initialize && $store.dispatch(appModel.actions.initState());
      const unsubscribe = $store.subscribe(() => {
        const {
          app: { appStatus, errorInfo },
        } = $store.getState();
        if (appStatus && appStatus !== "loading") {
          setState({
            appStatus,
            errorInfo,
          });
        }
        if (appStatus === "finish") {
          unsubscribe();
        }
      });

      $store.dispatch(
        appModel.actions.onLunch({ $route, $payload, ...appConfig })
      );

      return () => {
        unsubscribe && unsubscribe();
      };
    }, []);
    const renderContent = useMemo(
      () => () => {
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
      },
      [appStatus, JSON.stringify(errorInfo), history]
    );

    return (
      <Provider store={$store}>
        <ContextComponent locale={zhCN} appConfig={appConfig}>
          {renderContent()}
        </ContextComponent>
      </Provider>
    );
  };
};

export default createApp;
