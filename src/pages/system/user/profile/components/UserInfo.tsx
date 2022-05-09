import React, { useCallback, useEffect } from "react";
import { Button, Form, Input, Select, Space, message } from "antd";
import { updateUserProfile } from "../service";
import { navigate } from "@/src/zero/api";
import { IUserInfoForm } from "../service/index.d";

export default ({
  user,
  dictUserSex,
  getDictData,
}: {
  user: IUserInfoForm | null;
  dictUserSex: any;
  getDictData: Function;
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    getDictData();
  }, []);

  useEffect(() => {
    if (!user) return;
    form.setFieldsValue({ ...user });
  }, [user]);

  const onClose = () => {
    navigate.goBack();
  };

  const onSubmit = useCallback(() => {
    form
      .validateFields()
      .then(() => {
        const formValues = form.getFieldsValue();
        updateUserProfile(formValues).then((response) => {
          if (response.code === 200) {
            message.success("修改成功");
          } else {
            message.error(response?.msg || "修改失败");
          }
        });
      })
      .catch(() => {});
  }, [form]);

  return (
    <>
      <Form form={form} labelAlign='left'>
        <Form.Item
          name={`nickName`}
          label={`用户昵称`}
          rules={[
            {
              required: true,
              message: "用户昵称不能为空!",
            },
          ]}
        >
          <Input placeholder='请输入用户昵称' />
        </Form.Item>
        <Form.Item
          name={`phonenumber`}
          label={`手机号码`}
          rules={[
            {
              required: true,
              message: "手机号码不能为空!",
            },
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: "请输入正确的手机号码",
            },
          ]}
        >
          <Input placeholder='请输入手机号码' />
        </Form.Item>
        <Form.Item
          name={`email`}
          label={`邮箱`}
          rules={[
            {
              required: true,
              message: "邮箱地址不能为空!",
            },
            {
              type: "email",
              message: "请输入正确的邮箱地址!",
            },
          ]}
        >
          <Input placeholder='请输入邮箱' />
        </Form.Item>
        <Form.Item name={`sex`} label={`性别`}>
          <Select placeholder='请选择性别'>{dictUserSex.getOptions()}</Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={onSubmit}>
              保存
            </Button>
            <Button type='primary' danger onClick={onClose}>
              关闭
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};
