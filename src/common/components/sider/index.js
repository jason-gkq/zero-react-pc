import React, { Component } from "react";
import { connect } from "react-redux";

import { globalSelectors } from "../../redux";
import "./index.less";

import { Layout, Menu } from "antd";

const { SubMenu } = Menu;
const { Sider } = Layout;

class SiderErrorBoundary extends Component {
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
    if (this.state.hasError) {
      return "";
    }
    return this.props.children;
  }
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "redTab",
      hidden: false,
    };
  }

  render() {
    return (
      <SiderErrorBoundary>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <div className='logo' />
          <Menu theme='dark' mode='inline' defaultSelectedKeys={["4"]}>
            <Menu.Item key='1'>nav 1 </Menu.Item>
            <Menu.Item key='2'>nav 2</Menu.Item>
            <Menu.Item key='3'>nav 3</Menu.Item>
            <Menu.Item key='4'>nav 4</Menu.Item>
            <Menu.Item key='5'>nav 5</Menu.Item>
            <Menu.Item key='6'>nav 6</Menu.Item>
            <Menu.Item key='7'>nav 7</Menu.Item>
            <Menu.Item key='8'>nav 8</Menu.Item>
            <Menu.Item key='9'>nav 8</Menu.Item>
            <Menu.Item key='10'>nav 8</Menu.Item>
            <Menu.Item key='11'>nav 8</Menu.Item>
            <Menu.Item key='12'>nav 8</Menu.Item>
            <Menu.Item key='13'>nav 8</Menu.Item>
            <Menu.Item key='14'>nav 8</Menu.Item>
            <Menu.Item key='15'>nav 8</Menu.Item>
            <Menu.Item key='16'>nav 8</Menu.Item>
            <Menu.Item key='17'>nav 8</Menu.Item>
            <Menu.Item key='18'>nav 8</Menu.Item>
            <Menu.Item key='19'>nav 8</Menu.Item>
            <Menu.Item key='20'>nav 8</Menu.Item>
            <Menu.Item key='21'>nav 8</Menu.Item>
            <Menu.Item key='22'>nav 8</Menu.Item>
            <Menu.Item key='23'>nav 8</Menu.Item>
          </Menu>
        </Sider>
      </SiderErrorBoundary>
    );
  }
}
