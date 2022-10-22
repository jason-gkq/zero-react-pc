import React, { useCallback } from "react";
import { Form, Input, Space, message } from "antd";
import { changePwd } from "../service";
import { PermissionButton } from "@/zero/components";

// 密码必须包含以下四类字符中的三类字符,长度 8-16 位: <br>
//                                 ◎不能为默认密码<br>
//                                 ◎英文大写字母(A 到 Z)<br>
//                                 ◎英文小写字母(a 到 z)<br>
//                                 ◎10 个基本数字(0 到 9)<br>
//                                 ◎非字母字符(例如 !、$、#、%)<br></br>

const validatePassword = (rule: any, value: any, callback: Function) => {
  const reg1 =
    /^(?=.{8,16})(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[*?!&￥$%^#,./@";:><\[\]\(\)}{\-=+_\\|》《（）【】……。，、？’‘“”~ `]).*$/;
  const reg2 =
    /^(?=.{8,16})(?=.*?[A-Z])(?=.*?\d)(?=.*?[*?!&￥$%^#,./@";:><\[\]\(\)}{\-=+_\\|》《（）【】……。，、？’‘“”~ `]).*$/;
  const reg3 =
    /^(?=.{8,16})(?=.*?[a-z])(?=.*?\d)(?=.*?[*?!&￥$%^#,./@";:><\[\]\(\)}{\-=+_\\|》《（）【】……。，、？’‘“”~ `]).*$/;
  const reg4 =
    /^(?=.{8,16})(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[*?!&￥$%^#,./@";:><\[\]\(\)}{\-=+_\\|》《（）【】……。，、？’‘“”~ `]).*$/;
  const reg5 = /^(?=.{6,12})(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d).*$/;
  const reg6 = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g;
  const reg7 = /\s/g;
  if (reg6.test(value) || reg7.test(value)) {
    callback(new Error("密码不符合规范"));
  }
  if (
    reg1.test(value) ||
    reg2.test(value) ||
    reg3.test(value) ||
    reg4.test(value) ||
    reg5.test(value)
  ) {
    callback();
  } else {
    callback("密码不符合规范");
  }
};

export default () => {
  const [form] = Form.useForm();

  const equalToPassword = async (rule: any, value: any) => {
    if (form.getFieldValue("newPassword") !== value) {
      return Promise.reject("两次输入的密码不一致");
    }
    return;
  };

  const onSubmit = useCallback(() => {
    form
      .validateFields()
      .then(() => {
        const formValues = form.getFieldsValue();
        changePwd({
          password: formValues.oldPassword,
          newPassword: formValues.newPassword,
        })
          .then((response) => {
            message.success("修改成功");
          })
          .catch((e) => {
            message.error(e?.msg || "修改失败");
          });
      })
      .catch(() => {});
  }, [form]);

  return (
    <>
      <Form labelAlign="left" form={form}>
        <Form.Item
          name={`oldPassword`}
          label={`旧密码`}
          rules={[
            {
              required: true,
              message: "旧密码不能为空!",
            },
          ]}
        >
          <Input.Password placeholder="请输入旧密码" />
        </Form.Item>
        <Form.Item
          name={`newPassword`}
          label={`新密码`}
          rules={[
            {
              required: true,
              message: "新密码不能为空!",
            },
            {
              min: 8,
              max: 16,
              message: "长度在 8 到 16 个字符",
            },
            {
              required: true,
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item
          name={`confirmPassword`}
          label={`确认密码`}
          rules={[
            {
              required: true,
              message: "确认密码不能为空!",
            },
            {
              required: true,
              validator: equalToPassword,
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Space>
            <PermissionButton type="primary" onClick={onSubmit}>
              保存
            </PermissionButton>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
