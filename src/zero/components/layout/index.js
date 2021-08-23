import React, { Suspense, Fragment } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import "./index.less";
import { globalSelectors } from "../../redux";
import { ConfigureMenu } from "../../navigate";
import { Layout } from "antd";

import Header from "./header";
import Sider from "./sider";
import Content from "./content";
import { PageLoading } from "../business";

@connect((state) => {
  const { currentPage = {}, menus } = globalSelectors.getRoute(state);
  return { currentPage, menus };
})
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
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsed={collapsed} configureMenu={configureMenu} />
        <Layout className={collapsed ? "main-root-trigger" : "main-root"}>
          <Header
            onCollapse={this.onCollapse}
            collapsed={collapsed}
            configureMenu={configureMenu}
          />
          <Content>
            <Suspense fallback={<PageLoading />}>
              <Fragment>
                <Switch>
                  {$routes}                
                </Switch>
              </Fragment>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
