import React, { PureComponent, Fragment, lazy, Suspense } from 'react';
import { Switch, Redirect, withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import Sider from '@components/layout/Sider';
import RootPage from '@src/common/core/basePage';
import * as styles from './index.less';
import { generateRoute } from '@menus/menu.route';
import { getCookie, devSetCookieToken } from '@utils/handleCookie';
import { setAxiosToken } from '@utils/handleAxios';
import { toLoginPage } from '@utils/handleLogin';
import Connect from '@components/hoc/Connect';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@redux/store';

const { Content } = Layout;

/**
 * app生命周期管理
 * 页面挂载执行顺序为：
 * constructor
 *  1. 初始化项目相关配置信息和系统信息
 *  2. 初始化启动项目相关信息【sessionId，partenterSessionId，sa，语言包，主题，layout】等
 * static getDerivedStateFromProps
 * render
 * static getDerivedStateFromError
 * componentDidMount
 *  1. current-user，初始化用户信息；
 *  2. 获取菜单、权限等相关信息
 *
 * componentDidUpdate
 *
 * componentWillUnmount
 *
 * componentDidCatch(error, info)
 *  1. 此生命周期在后代组件抛出错误后被调用，发起sa报告，错误页面渲染
 */
class AppPage extends PureComponent {
	constructor(props) {
		super(props);
		const { routes, existRoute, redirects } = generateRoute();
		// console.log(11);
		this.state = {
			collapsed: false,
			routes,
			existRoute,
			redirects,
		};
	}
	/**
	 * 项目初始化操作
	 * 1. 初始化项目相关配置信息和系统信息
	 * 2. 初始化启动项目相关信息【sessionId，partenterSessionId，sa，语言包，主题，layout】等
	 * 3. current-user，初始化用户信息；
	 * 4. 获取菜单、权限等相关信息
	 */
	componentDidMount() {
		const { dispatch, isNeedPermission } = this.props;
		// 设置本地开发环境cookie的token
		devSetCookieToken();

		const token = getCookie('token');
		if (token) {
			setAxiosToken(token);
			if (isNeedPermission) {
				// 需要菜单和路由权限
				// 获取用户权限列表
				dispatch({
					type: 'app/get/permission',
					payload: {
						token,
					},
				});
			} else {
				// 不需要菜单和路由权限
				dispatch({
					type: 'app/get/menus',
				});
			}
		} else {
			// 转跳登陆页面
			toLoginPage();
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { menuList, isNeedPermission } = nextProps;

		if (menuList) {
			if (isNeedPermission) {
				// 需要菜单和路由权限
				// 根据用户权限菜单重新生成路由
				if (menuList.length != prevState.menuLen) {
					const permStr = sessionStorage.getItem('permission');
					const permList = permStr ? JSON.parse(permStr) : [];
					const { routes, existRoute, redirects } = generateRoute(menuList, permList);
					return {
						routes,
						existRoute,
						redirects,
						menuLen: menuList.length,
					};
				}
			} else {
				// 不需要菜单和路由权限
				const { routes, existRoute, redirects } = generateRoute(menuList, null);

				return {
					routes,
					existRoute,
					redirects,
					menuLen: menuList.length,
				};
			}
		}
		return null;
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.menuLen != this.state.menuLen) {
			const { existRoute } = this.state;
			this.props.dispatch({
				type: 'app/reset/state',
				payload: {
					existRoute,
				},
			});
		}
	}

	goToPage = (path) => {
		const { history } = this.props;
		history && path && history.push(path);
	};

	render() {
		const { collapsed, routes, redirects, existRoute } = this.state;
		const { history, match, menuList } = this.props;
		const siderProps = {
			collapsed,
			history,
			existRoute,
			menuList,
		};
		const rootProps = {
			routes,
			redirects,
			match,
			history,
			collapsed,
		};
		return (
			<PersistGate persistor={persistor} loading={null}>
				<Layout className={styles.app}>
					<Sider {...siderProps} />
					<RootPage {...rootProps} />
				</Layout>
			</PersistGate>
		);
	}
}

export default Connect(withRouter(AppPage), ({ app }) => app);
