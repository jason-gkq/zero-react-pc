import React from "react";
import { useCallback } from "react";
import { Form, Input, Select, message } from "antd";
import { useSelectEnum, NiceModal, useNiceModal, QuillEditor } from "@/zero";
import { addNotice, updateNotice } from "../service";
export const MODAL_ID = "system-notice-modal";
import { SYS_COMMON_STATUS, SYS_NOTICE_TYPE } from "@/common/enum/system";

const dictNoticeStatus = useSelectEnum(SYS_COMMON_STATUS);
const dictNoticeType = useSelectEnum(SYS_NOTICE_TYPE);

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
  }, [modalInfo, form]);

  return (
    <NiceModal
      id={MODAL_ID}
      title={modalInfo ? "修改公告" : "添加公告"}
      okText={"确定"}
      cancelText="取消"
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
            {
              type: "string",
              max: 50,
            },
            {
              required: true,
              validator: (rule: any, value: any, callback: Function) =>
                validateTrim(rule, value, callback, "公告标题"),
            },
          ]}
        >
          <Input placeholder="请输入公告名称" />
        </Form.Item>
        <Form.Item
          name={`noticeType`}
          label={`公告类型`}
          rules={[{ required: true }]}
          initialValue="1"
        >
          <Select placeholder="请选择">{dictNoticeType.getOptions()}</Select>
        </Form.Item>
        <Form.Item
          name={`status`}
          label={`状态`}
          rules={[{ required: true }]}
          initialValue="0"
        >
          <Select placeholder="请选择">{dictNoticeStatus.getOptions()}</Select>
        </Form.Item>
        <Form.Item name={`noticeContent`} label="内容">
          <QuillEditor></QuillEditor>
        </Form.Item>
      </Form>
    </NiceModal>
  );
});
