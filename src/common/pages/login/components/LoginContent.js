import React from "react";
import { Text, Button, View, Form, Input, Image } from "@/zero/components";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import ForgetPwd from "../containers/ForgetPwd";

export default (props) => {
  const { onLoginAction, loginTitle, showForgetAction, isForgetPwd } = props;
  if (isForgetPwd) {
    return null;
  }
  return (
    <View className="login_input_wrap">
      <Form
        name="normal_login"
        className="login_form"
        size="large"
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "请输入手机号码！" },
            {
              pattern: /^1[0-9]{10}/,
              message: "手机号码有误！",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="请输入手机号码"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: " 请输入密码！" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码！"
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" onClick={showForgetAction}>
            忘记密码？
          </a>
        </Form.Item>
        <Form.Item>
          <Button
            block
            type="primary"
            className="login-btn"
            size="large"
            onClick={onLoginAction}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </View>
  );
};
