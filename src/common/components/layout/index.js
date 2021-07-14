import React, { Suspense, Fragment } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";

import { globalSelectors, globalActions, store } from "../../redux";

import { Layout } from "antd";

import Header from "../header";
import Sider from "../sider";
import Content from "../content";

@connect(
  (state) => {
    const systemInfo = globalSelectors.getSystem(state);
    const { currentPage = {} } = globalSelectors.getRoute(state);
    return { systemInfo, currentPage };
  },
  (dispatch) => {
    return {
      // onBackAction(){
      //   dispatch(globalActions.navigate.goTo({ url: "/home/home2" }))
      // }
    };
  }
)
export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { systemInfo, $routes } = this.props;
    const { winHeight } = systemInfo;
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout style={{ minHeight: winHeight + "px" }}>
          <Sider />
          <Layout className='site-layout' style={{ marginLeft: 200 }}>
            <Header />
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
