import React, { useEffect } from "react";
import { useCallback } from "react";
import { Form, Input, Select, message } from "antd";
import { NiceModal, useNiceModal } from "@/src/zero/components";
export const MODAL_ID = "system-config-modal";
import { addConfig, updateConfig } from "../service/index";

export default NiceModal.create(
  MODAL_ID,
  ({ modalInfo, dictYesNo, getDictData }: any) => {
    const [form] = Form.useForm();
    const modal = useNiceModal(MODAL_ID);

    useEffect(() => {
      getDictData();
    }, []);
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
                if (res.code === 200) {
                  message.success("修改成功");
                  modal.resolve({ ...modalInfo, ...form.getFieldsValue() });
                  modal.hide();
                } else {
                  message.error(res?.msg || "修改失败");
                }
              })
              .catch((e) => {
                message.error(e?.msg || "修改失败");
              });
          } else {
            /* 新增 */
            addConfig(formInfo)
              .then((response) => {
                if (response.code === 200) {
                  message.success("新增成功");
                  modal.resolve({ ...modalInfo, ...form.getFieldsValue() });
                  modal.hide();
                } else {
                  message.error(response?.msg || "新增失败");
                }
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
        title={modalInfo ? "修改参数" : "添加参数"}
        okText={"确定"}
        cancelText='取消'
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
            ]}
          >
            <Input placeholder='请输入参数名称' />
          </Form.Item>
          <Form.Item
            name={`configKey`}
            label={`参数键名`}
            rules={[
              {
                required: true,
                message: "请输入参数键名!",
              },
            ]}
          >
            <Input placeholder='请输入参数键名' />
          </Form.Item>
          <Form.Item
            name={`configValue`}
            label={`参数键值`}
            rules={[
              {
                required: true,
                message: "请输入参数键值!",
              },
            ]}
          >
            <Input placeholder='请输入参数键值' />
          </Form.Item>
          <Form.Item name={`configType`} label={`系统内置`}>
            <Select placeholder='请选择系统内置'>
              {dictYesNo.getOptions()}
            </Select>
          </Form.Item>
          <Form.Item name={`remark`} label='备注'>
            <Input.TextArea placeholder='请输入内容' />
          </Form.Item>
        </Form>
      </NiceModal>
    );
  }
);
