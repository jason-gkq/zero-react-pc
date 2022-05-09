import React, { useEffect } from "react";
import { useCallback } from "react";
import { Form, Input, Select, message } from "antd";
import { NiceModal, useNiceModal } from "@/src/zero/components";
import { addNotice, updateNotice } from "../service";
import { QuillEditor } from "@/zero/components";
export const MODAL_ID = "system-notice-modal";

export default NiceModal.create(
  MODAL_ID,
  ({ modalInfo, dictNoticeStatus, dictNoticeType, getDictData }: any) => {
    const [form] = Form.useForm();
    const modal = useNiceModal(MODAL_ID);

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
            updateNotice(formInfo)
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
            addNotice(formInfo)
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

    useEffect(() => {
      getDictData();
    }, []);

    return (
      <NiceModal
        id={MODAL_ID}
        title={modalInfo ? "修改公告" : "添加公告"}
        okText={"确定"}
        cancelText='取消'
        onOk={handleSubmit}
        width={"650px"}
      >
        <Form
          form={form}
          initialValues={
            modalInfo
              ? Object.assign(modalInfo, {
                  noticeType: String(modalInfo.noticeType),
                })
              : modalInfo
          }
          labelAlign={"left"}
        >
          <Form.Item
            name={`noticeTitle`}
            label={`公告标题`}
            rules={[
              {
                required: true,
                message: "请输入公告标题!",
              },
            ]}
          >
            <Input placeholder='请输入公告名称' />
          </Form.Item>
          <Form.Item name={`noticeType`} label={`公告类型`}>
            <Select placeholder='请选择'>{dictNoticeType.getOptions()}</Select>
          </Form.Item>
          <Form.Item name={`status`} label={`状态`}>
            <Select placeholder='请选择'>
              {dictNoticeStatus.getOptions()}
            </Select>
          </Form.Item>
          <Form.Item name={`noticeContent`} label='内容'>
            <QuillEditor></QuillEditor>
          </Form.Item>
        </Form>
      </NiceModal>
    );
  }
);
