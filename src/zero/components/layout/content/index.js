import React, { Component } from "react";
import "./index.less";
import { Layout } from "antd";

const { Content } = Layout;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <Content className='main-content'>{this.props.children}</Content>;
  }
}
