import React, { Component } from "react";
import { BasePage } from "@/zero/core";
import model from "./index.model";
import LoginContent from "./containers/LoginContent";
import ForgetPwd from "./containers/ForgetPwd";
import "./index.less";
import { store } from "@/zero/redux";

import { View } from "@/zero/components";
@BasePage(model)
class Login extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {}
  render() {
    const { $model, $globalActions } = this.props;
    const { loginTitle } = store.getState().login;

    return (
      <View className='app-desktop'>
        <View className='login_container'>
          <View className='login_wrap'>
            <View className='login_title'>{loginTitle}</View>
            <ForgetPwd $model={$model} $globalActions={$globalActions} />
            <LoginContent $model={$model} $globalActions={$globalActions} />
          </View>
        </View>
      </View>
    );
  }
}
export default Login;
