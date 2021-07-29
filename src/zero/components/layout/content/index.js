import React, { Component } from "react";
import "./index.less";

import { Layout } from "antd";
import { ErrorBoundary } from "../../business";

const { Content } = Layout;

class ContentErrorBoundary extends Component {
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
        <Content className='main-content'>
          <ErrorBoundary msg={"页面渲染出错"} />
        </Content>
      );
    }
    return this.props.children;
  }
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ContentErrorBoundary>
        <Content className='main-content'>{this.props.children}</Content>
      </ContentErrorBoundary>
    );
  }
}
