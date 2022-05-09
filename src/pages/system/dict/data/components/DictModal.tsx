import React, { useEffect } from "react";
import { useCallback } from "react";
import { Form, Input, Select, message, InputNumber } from "antd";
import { NiceModal, useNiceModal } from "@/src/zero/components";
import { addDictData, updateDictData } from "../service";
export const MODAL_ID = "system-dict-data-modal";

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
          if (modalInfo.dictCode) {
            updateDictData(formValues)
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
            addDictData(formValues)
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
        title={modalInfo.dictCode ? "修改字典数据" : "添加字典数据"}
        okText='确定'
        cancelText='取消'
        onOk={handleSubmit}
      >
        <Form form={form} initialValues={modalInfo} labelAlign={"left"}>
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
            <Input
              placeholder={modalInfo?.dictType || "请输入字典类型"}
              disabled={modalInfo?.dictType}
            />
          </Form.Item>
          <Form.Item
            name={`dictLabel`}
            label={`数据标签`}
            rules={[
              {
                required: true,
                message: "数据标签不能为空!",
              },
            ]}
          >
            <Input placeholder='请输入数据标签' />
          </Form.Item>
          <Form.Item
            name={`dictValue`}
            label={`数据键值`}
            rules={[
              {
                required: true,
                message: "数据键值不能为空!",
              },
            ]}
          >
            <Input placeholder='请输入数据键值' />
          </Form.Item>
          <Form.Item
            name={`dictSort`}
            label={`显示排序`}
            rules={[
              {
                required: true,
                message: "显示排序不能为空!",
              },
            ]}
          >
            <InputNumber
              min={0}
              value={modalInfo?.dictSort || 0}
              defaultChecked
            />
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
