import React, { PureComponent, Fragment, lazy, Suspense } from "react";
import { Switch, Redirect, withRouter } from "react-router-dom";
import { Layout } from "antd";
import Header from "@components/layout/Header";
import Sider from "@components/layout/Sider";
import Footer from "@components/layout/Footer";
import * as styles from "./index.less";
import { generateRoute } from "@menus/menu.route";
import { getCookie, devSetCookieToken } from "@utils/handleCookie";
import { setAxiosToken } from "@utils/handleAxios";
import { toLoginPage } from "@utils/handleLogin";
import Connect from "@components/hoc/Connect";

const { Content } = Layout;

/**
 * app主页面布局
 */
class AppPage extends PureComponent {
  constructor(props) {
    super(props);
    const { routes, existRoute, redirects } = generateRoute();
    this.state = {
      collapsed: false,
      routes,
      existRoute,
      redirects,
    };
  }

  componentDidMount() {
    const { dispatch, isNeedPermission } = this.props;
    // 设置本地开发环境cookie的token
    devSetCookieToken();

    const token = getCookie("token");
    if (token) {
      setAxiosToken(token);
      if (isNeedPermission) {
        // 需要菜单和路由权限
        // 获取用户权限列表
        dispatch({
          type: "app/get/permission",
          payload: {
            token,
          },
        });
      } else {
        // 不需要菜单和路由权限
        dispatch({
          type: "app/get/menus",
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
          const permStr = sessionStorage.getItem("permission");
          const permList = permStr ? JSON.parse(permStr) : [];
          const { routes, existRoute, redirects } = generateRoute(
            menuList,
            permList
          );
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
        type: "app/reset/state",
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

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
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
    console.log(routes, redirects);
    return (
      <Layout className={styles.app}>
        <Sider {...siderProps} />
        <Layout>
          <Header
            collapsed={collapsed}
            history={history}
            toggle={this.toggle}
          />
          <Content className={styles.content}>
            {/* <Breadcrumb /> */}
            <Suspense fallback={<div>Loading...</div>}>
              <Fragment>
                <Switch>
                  {routes}
                  {redirects}
                  <Redirect to={match.url} />
                </Switch>
              </Fragment>
            </Suspense>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default Connect(withRouter(AppPage), ({ app }) => app);
