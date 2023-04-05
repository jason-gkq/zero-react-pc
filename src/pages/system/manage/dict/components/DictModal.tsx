import React, { useCallback } from "react";
import { Form, Input, Select, message } from "antd";
import { addType, updateType } from "../service";
export const MODAL_ID = "system-dict-modal";
import { NiceModal, useNiceModal, useSelectEnum } from "@/zero";

import { SYS_COMMON_STATUS } from "@/common/enum/system";

const dictCommonStatus = useSelectEnum(SYS_COMMON_STATUS);

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
        const formValues = {
          ...modalInfo,
          ...form.getFieldsValue(),
        };
        if (modalInfo) {
          updateType(formValues)
            .then((res) => {
              message.success("修改成功");
              modal.resolve({ ...modalInfo, ...form.getFieldsValue() });
              modal.hide();
            })
            .catch((e) => {
              message.error(e?.msg || "修改失败");
            });
        } else {
          addType(formValues)
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
  }, [modal, modalInfo, form]);

  return (
    <NiceModal
      id={MODAL_ID}
      title={modalInfo ? "修改字典类型" : "添加字典类型"}
      okText="确定"
      cancelText="取消"
      onOk={handleSubmit}
    >
      <Form form={form} initialValues={modalInfo} labelAlign={"left"}>
        <Form.Item
          name={`dictName`}
          label={`字典名称`}
          rules={[
            {
              required: true,
              message: "字典名称不能为空!",
            },
            {
              type: "string",
              max: 50,
            },
            {
              required: true,
              validator: (rule: any, value: any, callback: Function) =>
                validateTrim(rule, value, callback, "字典名称"),
            },
          ]}
        >
          <Input placeholder="请输入字典名称" />
        </Form.Item>
        <Form.Item
          name={`dictType`}
          label={`字典类型`}
          rules={[
            {
              required: true,
              message: "字典类型不能为空!",
            },
            {
              type: "string",
              max: 50,
            },
            {
              required: true,
              validator: (rule: any, value: any, callback: Function) =>
                validateTrim(rule, value, callback, "字典类型"),
            },
          ]}
        >
          <Input placeholder="请输入字典类型" />
        </Form.Item>
        <Form.Item
          name={`status`}
          label={`状态`}
          initialValue="0"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="请选择"
            options={dictCommonStatus.getOptions()}
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
