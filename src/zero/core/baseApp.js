/**
 * 1. 初始化store
 * 2. 设置axios拦截器
 * 3. 初始化语言包
 * 4. 定义项目入口 sdfsd
 */
import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { View, PageLoading, ErrorBoundary } from "../components";
import RegisterApp from "./registerApp";

import { AppConfigContext } from "./configureContext";

const AppPage = lazy(() =>
  import(/* webpackChunkName: 'app' */ "../components/layout")
);

export default (appModel) => (WrappedComponent) => {
  @RegisterApp(appModel)
  class AppComponent extends WrappedComponent {
    constructor(props) {
      super(props);
      const {
        env: { status, appName },
      } = props.$store.getState();
      this.state = {
        status: status ? "success" : "loading",
        appName,
      };
    }

    componentDidMount() {
      const { $store, $onLunchPayload } = this.props;
      const unsubscribe = $store.subscribe(() => {
        const {
          env: { status },
        } = $store.getState();
        if (status) {
          unsubscribe();
          $store.dispatch(
            appModel.actions.didMount({
              ...$onLunchPayload,
              done: () => {
                this.setState({
                  status: "success",
                });
              },
            })
          );
        }
      });
      if (super.componentDidMount) {
        super.componentDidMount();
      }
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }

    renderContent() {
      const { $routes, $fullRoutes } = this.props;
      const { status, appName } = this.state;
      switch (status) {
        case "loading":
          return (
            <View
              style={{
                height: "100vh",
              }}
            >
              <PageLoading />
            </View>
          );
        case "error":
          return (
            <View
              style={{
                height: "100vh",
              }}
            >
              <ErrorBoundary msg={"网络异常，请刷新重试"} />
            </View>
          );
        default:
          return (
            <Switch>
              {$fullRoutes}
              <Route path={`/${appName}`}>
                <AppPage $routes={$routes} />
              </Route>
            </Switch>
          );
      }
    }

    render() {
      const { $store, $history } = this.props;
      return (
        <Provider store={$store}>
          <AppConfigContext.Provider value={appModel.config}>
            {/* <ThemeContext.Provider value={$theme}> */}
            <Suspense
              fallback={
                <View
                  style={{
                    height: "100vh",
                  }}
                >
                  <PageLoading />
                </View>
              }
            >
              <Router history={$history}>{this.renderContent()}</Router>
            </Suspense>
            {/* </ThemeContext.Provider> */}
          </AppConfigContext.Provider>
        </Provider>
      );
    }
  }
  return AppComponent;
};
