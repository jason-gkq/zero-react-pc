import React from "react";
import { Text, Button, View, Form, Input, Image } from "@/zero/components";
import user from "@/assets/img/auth/p.jpg";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default (props) => {
  const { onLoginAction, loginTitle, fDate } = props;
  return (
    <View className="app-desktop">
      <View className="login_container"></View>
      <View className="login_wrap">
        <View className="login_title">{loginTitle}</View>
        <View className="login_input_wrap">
          <Form
            name="normal_login"
            className="login_form"
            size="large"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "请输入手机号码！" }]}
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
              <a className="login-form-forgot" href="">
                忘记密码？
              </a>
            </Form.Item>
            <Form.Item>
              <Button
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
      </View>
    </View>
  );
};
