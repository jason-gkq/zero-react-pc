import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@redux/store";
import ReactIntlProvider from "@components/react-intl/ReactIntlProvider";
import { setAxiosBase } from "@utils/handleAxios";
import "antd/dist/antd.less";

// 设置axios拦截器
setAxiosBase(); //打包时chunk名称，默认为数字，不利于定位分析打包文件  // const LoginPage = lazy(() => import(/* webpackChunkName: 'login' */'./pages/login'))

/* webpackChunkName: "login" */
const AppPage = lazy(
  async () => await import(/* webpackChunkName: 'app' */ "./app/index.js")
);

const App = (
  <Provider store={store}>
    <ReactIntlProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {/* <Route path='/login' component={LoginPage} /> */}
            <Route path='/lcbtest' component={AppPage} />
            <Redirect to='/lcbtest' />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </ReactIntlProvider>
  </Provider>
);

export default App;
