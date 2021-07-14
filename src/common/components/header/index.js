import React, { Component } from "react";
import "./index.less";

import { Layout } from "antd";
const { Header } = Layout;
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

class HeaderErrorBoundary extends Component {
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
      return (
        <Header className='site-layout-background' style={{ padding: 0 }}>
          回首页
        </Header>
      );
    }
    return this.props.children;
  }
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <HeaderErrorBoundary>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          {React.createElement(
            this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: this.toggle,
            }
          )}
          User / Bill
          {/* <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
        </Header>
      </HeaderErrorBoundary>
    );
  }
}
