import React, { useEffect } from "react";
import { useCallback } from "react";
import { Form, Input, Select, message } from "antd";
import { NiceModal, useNiceModal } from "@/src/zero/components";
import { addType, updateType } from "../service";
export const MODAL_ID = "system-dict-modal";

export default NiceModal.create(
  MODAL_ID,
  ({ modalInfo, dictNormalDisable, getDictData }: any) => {
    const [form] = Form.useForm();

    useEffect(() => {
      getDictData();
    }, []);
    const modal = useNiceModal(MODAL_ID);
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
            addType(formValues)
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
          modal.resolve({ ...modalInfo, ...form.getFieldsValue() });
          modal.hide();
        })
        .catch((e) => {});
    }, [modal, modalInfo, form]);

    return (
      <NiceModal
        id={MODAL_ID}
        title={modalInfo ? "修改字典类型" : "添加字典类型"}
        okText='确定'
        cancelText='取消'
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
            ]}
          >
            <Input placeholder='请输入字典名称' />
          </Form.Item>
          <Form.Item
            name={`dictType`}
            label={`字典类型`}
            rules={[
              {
                required: true,
                message: "字典类型不能为空!",
              },
            ]}
          >
            <Input placeholder='请输入字典类型' />
          </Form.Item>
          <Form.Item name={`status`} label={`状态`}>
            <Select placeholder='请选择'>
              {dictNormalDisable.getOptions()}
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
