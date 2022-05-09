import React, { useEffect } from "react";
import { useCallback, useState } from "react";
import { Form, Input, Select, InputNumber, TreeSelect, message } from "antd";
import { NiceModal, useNiceModal } from "@/src/zero/components";
import { updateDept, addDept } from "../service";
import { IResQueryDepList } from "../service/index.d";
export const MODAL_ID = "system-dept-modal";

export default NiceModal.create(
  MODAL_ID,
  ({ modalInfo, deptOptions, dictNormalDisable, getDictData }: any) => {
    const [form] = Form.useForm();

    const modal = useNiceModal(MODAL_ID);
    const [deptTreeData, setDeptTreeData] = useState([]);

    useEffect(() => {
      getDictData();
    }, []);

    useEffect(() => {
      const getTreeData = (deptOptions: IResQueryDepList[], pIds: number[]) => {
        if (!deptOptions) return;
        return deptOptions.reduce((list: any, item: any) => {
          if (Reflect.has(item, "children")) {
            list.push({
              key: item.deptId,
              value: item.deptId,
              title: item.deptName,
              parentIds: pIds,
              children: getTreeData((item as any).children, [
                ...pIds,
                item.deptId,
              ]),
            });
          } else {
            list.push({
              key: item.deptId,
              value: item.deptId,
              title: item.deptName,
              parentIds: pIds,
            });
          }
          return list;
        }, []);
      };

      const treeData = getTreeData(deptOptions, []);
      setDeptTreeData(treeData);
    }, [deptOptions]);

    const [value, setValue] = useState(undefined);
    const onChange = () => {
      setValue(value);
    };

    const handleSubmit = useCallback(() => {
      form
        .validateFields()
        .then(() => {
          const formValues = {
            ...modalInfo,
            ...form.getFieldsValue(),
          };
          if (modalInfo.deptId) {
            /* 修改 */
            updateDept(formValues)
              .then((response) => {
                if (response.code === 200) {
                  message.success("修改成功");
                  modal.resolve({ ...modalInfo, ...form.getFieldsValue() });
                  modal.hide();
                } else {
                  message.error(response?.msg || "修改失败");
                }
              })
              .catch((e) => {
                message.error(e?.msg || "修改失败");
              });
          } else {
            /* 新增 */
            addDept(formValues)
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
        title={modalInfo.deptId ? "修改部门" : "添加部门"}
        onOk={handleSubmit}
      >
        <Form form={form} initialValues={modalInfo} labelAlign={"left"}>
          {modalInfo && modalInfo.parentId == 0 ? null : (
            <Form.Item
              name={`parentId`}
              label={`上级部门`}
              rules={[
                {
                  required: true,
                  message: "上级部门不能为空!",
                },
              ]}
            >
              <TreeSelect
                showSearch
                style={{ width: "100%" }}
                value={value}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                placeholder='请选择上级部门'
                allowClear
                treeDefaultExpandAll
                onChange={onChange}
                treeData={deptTreeData}
              ></TreeSelect>
            </Form.Item>
          )}
          <Form.Item
            name={`deptName`}
            label={`部门名称`}
            rules={[
              {
                required: true,
                message: "部门名称不能为空!",
              },
            ]}
          >
            <Input placeholder='请输入部门名称' />
          </Form.Item>
          <Form.Item
            name={`orderNum`}
            label={`显示排序`}
            rules={[
              {
                required: true,
                message: "菜单顺序不能为空!",
              },
            ]}
          >
            <InputNumber min={1} max={100000} defaultChecked={true} />
          </Form.Item>
          <Form.Item name={`leader`} label={`负责人`}>
            <Input placeholder='请输入负责人' />
          </Form.Item>
          <Form.Item name={`phone`} label={`联系电话`}>
            <Input placeholder='请输入联系电话' />
          </Form.Item>
          <Form.Item
            name={`email`}
            label={`联系邮箱`}
            rules={[
              {
                type: "email",
                message: "请输入正确的邮箱!",
              },
            ]}
          >
            <Input placeholder='请输入联系邮箱' />
          </Form.Item>
          <Form.Item name={`status`} label={`部门状态`}>
            <Select placeholder='请选择部门状态'>
              {dictNormalDisable.getOptions()}
            </Select>
          </Form.Item>
        </Form>
      </NiceModal>
    );
  }
);
