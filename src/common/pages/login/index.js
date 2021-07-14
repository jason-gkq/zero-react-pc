import React, { Component } from "react";
import { BasePage } from "@/common/core";
import model from "./index.model";
import Content from "./containers/Content";
import "./index.less";

@BasePage(model)
class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { $model, $globalActions } = this.props;
    return <Content $model={$model} $globalActions={$globalActions} />;
  }
}
export default Login;
