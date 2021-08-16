import React from "react";
import {
  Text,
  Button,
  View,
  Form,
  Input,
  Image,
  Row,
  Col,
} from "@/zero/components";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default (props) => {
  const {
    onLoginAction,
    backLoginAction,
    isForgetPwd,
    codeDesc,
    getCodeAction,
    codeDisabled,
  } = props;
  if (!isForgetPwd) {
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
        <Form.Item>
          <Row>
            <Col span={12}>
              <Text style={{ fontSize: "20px", lineHeight: "20px" }}>
                忘记密码
              </Text>
            </Col>
            <Col span={12} className="text-right" onClick={backLoginAction}>
              <a style={{ lineHeight: "20px" }}>返回登录</a>
            </Col>
          </Row>
        </Form.Item>
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
          rules={[
            { required: true, message: " 请输入新密码！" },
            {
              pattern: /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))(?!^.*[\u4E00-\u9FA5].*$)^\S{8,16}$/,
              message:
                "请输入包含数字，字母，符号中任意2种类型的8位及以上密码，例如：abc123456",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="请输入密码！"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "请输入确认密码！" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                console.log("getFieldValue", getFieldValue());

                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error("确认密码与新密码不符！"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder=" 请输入确认密码！"
          />
        </Form.Item>

        <Form.Item
          name="captchaCode"
          rules={[{ required: true, message: "请填写验证码！" }]}
        >
          <Row justify="space-between" align="middle">
            <Col span={12}>
              <Input
                type="password"
                placeholder="验证码"
                className="captcha-input"
                size="default"
              />
            </Col>
            <Col span={12} className="text-right">
              <Button
                type="primary"
                size="middle"
                disabled={codeDisabled}
                onClick={getCodeAction}
              >
                {codeDesc}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
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
