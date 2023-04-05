import React, { useCallback } from "react";
import { Form, Input, Select, message } from "antd";
export const MODAL_ID = "system-config-modal";
import { addConfig, updateConfig } from "../service/index";
import { SYS_YES_NO } from "@/common/enum/system";
import { NiceModal, useNiceModal, useSelectEnum } from "@/zero";

const dictYesNo = useSelectEnum(SYS_YES_NO);

export default NiceModal.create(MODAL_ID, ({ modalInfo }: any) => {
  const [form] = Form.useForm();
  const modal = useNiceModal(MODAL_ID);

  const validateTrim = (
    rule: any,
    value: any,
    callback: Function,
    label?: string
  ) => {
    if (
      form.getFieldValue(rule.field) &&
      !form.getFieldValue(rule.field).trim().length
    ) {
      callback(new Error(`${label}不能为空！`));
    } else {
      callback();
    }
  };

  const handleSubmit = useCallback(() => {
    form
      .validateFields()
      .then(() => {
        const formInfo = {
          ...modalInfo,
          ...form.getFieldsValue(),
        };
        if (modalInfo) {
          /* 修改 */
          updateConfig(formInfo)
            .then((res) => {
              message.success("修改成功");
              modal.resolve({ ...modalInfo, ...form.getFieldsValue() });
              modal.hide();
            })
            .catch((e) => {
              message.error(e?.msg || "修改失败");
            });
        } else {
          /* 新增 */
          addConfig(formInfo)
            .then((response) => {
              message.success("新增成功");
              modal.resolve({ ...modalInfo, ...form.getFieldsValue() });
              modal.hide();
            })
            .catch((e) => {
              message.error(e?.msg || "新增失败");
            });
        }
      })
      .catch((e) => {});
  }, [modalInfo, form]);
  return (
    <NiceModal
      id={MODAL_ID}
      title={modalInfo ? "修改参数" : "添加参数"}
      okText={"确定"}
      cancelText="取消"
      onOk={handleSubmit}
    >
      <Form form={form} initialValues={modalInfo} labelAlign={"left"}>
        <Form.Item
          name={`configName`}
          label={`参数名称`}
          rules={[
            {
              required: true,
              message: "请输入参数名称!",
            },
            {
              type: "string",
              max: 50,
            },
            {
              required: true,
              validator: (rule: any, value: any, callback: Function) =>
                validateTrim(rule, value, callback, "参数名称"),
            },
          ]}
        >
          <Input placeholder="请输入参数名称" />
        </Form.Item>
        <Form.Item
          name={`configKey`}
          label={`参数键名`}
          rules={[
            {
              required: true,
              message: "请输入参数键名!",
            },
            {
              type: "string",
              max: 50,
            },
            {
              required: true,
              validator: (rule: any, value: any, callback: Function) =>
                validateTrim(rule, value, callback, "参数键名"),
            },
          ]}
        >
          <Input placeholder="请输入参数键名" />
        </Form.Item>
        <Form.Item
          name={`configValue`}
          label={`参数键值`}
          rules={[
            {
              required: true,
              message: "请输入参数键值!",
            },
            {
              type: "string",
              max: 50,
            },
            {
              required: true,
              validator: (rule: any, value: any, callback: Function) =>
                validateTrim(rule, value, callback, "参数键值"),
            },
          ]}
        >
          <Input placeholder="请输入参数键值" />
        </Form.Item>
        <Form.Item
          name={`configType`}
          label={`系统内置`}
          rules={[{ required: true }]}
          initialValue="Y"
        >
          <Select
            placeholder="请选择系统内置"
            options={dictYesNo.getOptions()}
          />
        </Form.Item>
        <Form.Item
          name={`remark`}
          label="备注"
          rules={[
            {
              type: "string",
              max: 50,
            },
          ]}
        >
          <Input.TextArea placeholder="请输入内容" />
        </Form.Item>
      </Form>
    </NiceModal>
  );
});
