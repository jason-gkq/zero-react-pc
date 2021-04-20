/**
 * 1. 初始化store
 * 2. 设置axios拦截器
 * 3. 初始化语言包
 * 4. 定义项目入口
 */
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '@redux/store';
import packageJson from '../package.json';
import ReactIntlProvider from '@components/react-intl/ReactIntlProvider';
import { setAxiosBase } from '@utils/handleAxios';
import 'antd/dist/antd.less';
// import "./app.css";

// console.log(packageJson, process.env);

const homepage = packageJson.homepage && packageJson.homepage.slice(0, -1) ? packageJson.homepage.slice(0, -1) : '/';

const systemInfo = { packageJson, processEnv: process.env };
// 设置axios拦截器
setAxiosBase(); //打包时chunk名称，默认为数字，不利于定位分析打包文件  // const LoginPage = lazy(() => import(/* webpackChunkName: 'login' */'./pages/login'))

/* webpackChunkName: "login" */
const AppPage = lazy(async () => await import(/* webpackChunkName: 'app' */ './app/index.js'));

const App = (
	<Provider store={store}>
		{/* <PersistGate persistor={persistor} loading={null}> */}
		<ReactIntlProvider>
			<BrowserRouter>
				<Suspense fallback={<div>Loading...</div>}>
					<Switch>
						{/* <Route path='/login' component={LoginPage} /> */}
						<Route path={homepage} component={AppPage} />
						<Redirect to={homepage} />
					</Switch>
				</Suspense>
			</BrowserRouter>
		</ReactIntlProvider>
		{/* </PersistGate> */}
	</Provider>
);

export default App;
