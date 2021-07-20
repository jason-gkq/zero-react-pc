import React, { Suspense, Fragment } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import "./index.less";
import { globalSelectors, globalActions, store } from "../../redux";

import { Layout } from "antd";

import Header from "../header";
import Sider from "../sider";
import Content from "../content";

@connect(
  (state) => {
    const systemInfo = globalSelectors.getSystem(state);
    const { currentPage = {}, menus } = globalSelectors.getRoute(state);
    return { systemInfo, currentPage, menus };
  },
  (dispatch) => {
    return {
      // onBackAction(){
      //   dispatch(globalActions.navigate.goTo({ url: "/home/home2/index" }))
      // }
    };
  }
)
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.onCollapse = this.onCollapse.bind(this);
  }

  onCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { $routes, menus } = this.props;
    const { collapsed } = this.state;
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider menus={menus} collapsed={collapsed} />
          <Layout className={collapsed ? "main-root-trigger" : "main-root"}>
            <Header onCollapse={this.onCollapse} collapsed={collapsed} />
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
    );
  }
}
