import React from "react";
import { useCallback } from "react";
import { Form, Input, Select, InputNumber, message } from "antd";
import { NiceModal, useNiceModal } from "@/src/zero/components";
export const MODAL_ID = "system-post-modal";
import { updatePost, addPost } from "../service";

export default NiceModal.create(
  MODAL_ID,
  ({ modalInfo, dictNormalDisable }: any) => {
    const [form] = Form.useForm();

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
            /* 修改 */
            updatePost(formValues)
              .then((response) => {
                message.success("修改成功");
                modal.resolve({ ...modalInfo, ...form.getFieldsValue() });
                modal.hide();
              })
              .catch((e) => {
                message.error(e?.msg || "修改失败");
              });
          } else {
            /* 新增 */
            addPost(formValues)
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
        title={modalInfo ? "修改岗位" : "添加岗位"}
        okText={modalInfo ? "更新" : "创建"}
        cancelText='取消'
        onOk={handleSubmit}
      >
        <Form form={form} initialValues={modalInfo} labelAlign={"left"}>
          <Form.Item
            name={`postName`}
            label={`岗位名称`}
            rules={[
              {
                required: true,
                message: "岗位名称不能为空!",
              },
            ]}
          >
            <Input placeholder='请输入岗位名称' />
          </Form.Item>
          <Form.Item
            name={`postCode`}
            label={`岗位编码`}
            rules={[
              {
                required: true,
                message: "岗位编码不能为空!",
              },
            ]}
          >
            <Input placeholder='请输入岗位编码' />
          </Form.Item>
          <Form.Item
            name={`postSort`}
            label={`岗位顺序`}
            rules={[
              {
                required: true,
                message: "岗位顺序不能为空!",
              },
            ]}
          >
            <InputNumber min={1} max={100000} />
          </Form.Item>
          <Form.Item
            name={`status`}
            label={`状态`}
            rules={[
              {
                required: true,
                message: "请选择状态!",
              },
            ]}
          >
            <Select placeholder='请选择状态'>
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
