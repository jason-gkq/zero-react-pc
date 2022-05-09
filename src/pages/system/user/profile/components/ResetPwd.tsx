import React, { useEffect, useCallback } from "react";
import { Button, Form, Input, Space, message } from "antd";
import { IPwd } from "../service/index.d";
import { navigate } from "@/src/zero/api";
import { updateUserPwd } from "../service";


export default ({ user }: { user: IPwd | null }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (!user) return
        form.setFieldsValue({ ...user })
    }, [user])

    const equalToPassword = (rule: any, value: any, callback: Function) => {
        if (form.getFieldValue('newPassword') !== value) {
            callback(new Error("两次输入的密码不一致"));
        } else {
            callback();
        }
    }

    const onSubmit = useCallback(() => {
        form
            .validateFields()
            .then(() => {
                const formValues = form.getFieldsValue();
                updateUserPwd(formValues.oldPassword, formValues.newPassword).then(response => {
                    if (response.code === 200) {
                        message.success('修改成功')
                    } else {
                        message.error(response?.msg || '修改失败');
                    }
                })
            }).catch(() => { })
    }, [form])

    const onClose = () => {
        navigate.goBack()
    }
    return <>
        <Form labelAlign='left' form={form}>
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
                <Input placeholder='请输入旧密码' />
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
                        min: 6,
                        max: 20,
                        message: "长度在 6 到 20 个字符"
                    }
                ]}
            >
                <Input placeholder='请输入新密码' />
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
                        validator: equalToPassword
                    }
                ]}
            >
                <Input placeholder='请输入密码' />
            </Form.Item>
            <Form.Item>
                <Space>
                    <Button type="primary" onClick={onSubmit}>保存</Button>
                    <Button type="primary" danger onClick={onClose}>关闭</Button>
                </Space>
            </Form.Item>
        </Form>
    </>
}