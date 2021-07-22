import React, { Suspense, Fragment } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import "./index.less";
import { globalSelectors } from "../../redux";
import { ConfigureMenu } from "../../navigate";
import { Layout } from "antd";

import Header from "./header";
import Sider from "./sider";
import Content from "./content";

class LayoutErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // this.setState({
    //   error,
    //   errorInfo,
    // });
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    // if (this.state.hasError) {
    //   return <Header className='main-header'>回首页</Header>;
    // }
    return this.props.children;
  }
}

@connect(
  (state) => {
    const { currentPage = {}, menus } = globalSelectors.getRoute(state);
    return { currentPage, menus };
  }
  // (dispatch) => {}
)
export default class extends React.Component {
  constructor(props) {
    super(props);
    const { menus } = props;

    const configureMenu = new ConfigureMenu(menus);

    this.state = {
      collapsed: false,
      configureMenu,
    };

    this.onCollapse = this.onCollapse.bind(this);
  }

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { $routes } = this.props;
    const { collapsed, configureMenu } = this.state;

    return (
      <LayoutErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsed={collapsed} configureMenu={configureMenu} />
            <Layout className={collapsed ? "main-root-trigger" : "main-root"}>
              <Header
                onCollapse={this.onCollapse}
                collapsed={collapsed}
                configureMenu={configureMenu}
              />
              <Content>
                <Suspense fallback={<div>Loading...</div>}>
                  <Fragment>
                    <Switch>{$routes}</Switch>
                  </Fragment>
                </Suspense>
              </Content>
            </Layout>
          </Layout>
        </Suspense>
      </LayoutErrorBoundary>
    );
  }
}
