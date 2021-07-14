/**
 * 1. 初始化store
 * 2. 设置axios拦截器
 * 3. 初始化语言包
 * 4. 定义项目入口 sdfsd
 */
import React, { Suspense, lazy } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeContext } from "./themeContext";

import RegisterApp from "./registerApp";

const AppPage = lazy(() =>
  import(/* webpackChunkName: 'app' */ "../components/layout")
);

export default (appModel) => (WrappedComponent) => {
  @RegisterApp(appModel)
  class AppComponent extends WrappedComponent {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      if (super.componentDidMount) {
        super.componentDidMount();
      }
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }

    render() {
      const { $store, $history, $routes, $theme } = this.props;
      return (
        <Provider store={$store}>
          <ThemeContext.Provider value={$theme}>
            <Suspense fallback={<div>Loading...</div>}>
              <Router history={$history}>
                <Switch>
                  <Route path='/lcbtest'>
                    <AppPage $routes={$routes} />
                  </Route>
                </Switch>
              </Router>
            </Suspense>
          </ThemeContext.Provider>
        </Provider>
      );
    }
  }
  return AppComponent;
};
