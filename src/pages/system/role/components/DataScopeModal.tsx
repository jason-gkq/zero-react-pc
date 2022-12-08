import React, { useEffect, useState, useMemo, useCallback } from "react";
import { dataScopeRole } from "../service";
import type { IResGetDeptTreeSelect } from "../service/index.d";
import { Form, Input, Select, message, Tree } from "antd";
import { NiceModal, useNiceModal } from "@/zero";
export const ROLE_DATA_SCOPE_MODAL_ID = "system-role-data-scope-modal";
const { Option } = Select;

// 数据范围选项
const dataScopeOptions = [
  {
    value: "1",
    label: "全部数据权限",
  },
  {
    value: "2",
    label: "自定数据权限",
  },
  {
    value: "3",
    label: "本部门数据权限",
  },
  {
    value: "4",
    label: "本部门及以下数据权限",
  },
  {
    value: "5",
    label: "仅本人数据权限",
  },
];

export default NiceModal.create(
  ROLE_DATA_SCOPE_MODAL_ID,
  ({ modalInfo, deptOptions, deptCheckedKeys }: any) => {
    const [form] = Form.useForm();
    const modal = useNiceModal(ROLE_DATA_SCOPE_MODAL_ID);
    const [selectedScope, setSelectedScope] = useState<string>(
      modalInfo.dataScope || "1"
    );
    const [expandedKeys, setExpandedKeys] = useState<never[]>([]);
    const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);
    const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(
      deptCheckedKeys || []
    );
    const [deptTreeData, setDeptTreeData] = useState<[]>([]);

    const handleChange = (value: string) => {
      setSelectedScope(value);
    };

    useEffect(() => {
      const getTreeData = (
        deptOptions: IResGetDeptTreeSelect["depts"],
        pIds: number[]
      ) => {
        if (!deptOptions) return;
        return deptOptions.reduce((list: any, item: any) => {
          if (Reflect.has(item, "children")) {
            list.push({
              key: item.id,
              value: item.id,
              title: item.label,
              parentIds: pIds,
              children: getTreeData((item as any).children, [...pIds, item.id]),
            });
          } else {
            list.push({
              key: item.id,
              value: item.id,
              title: item.label,
              parentIds: pIds,
            });
          }
          return list;
        }, []);
      };

      const treeData = getTreeData(deptOptions, []);
      setDeptTreeData(treeData);
    }, [deptOptions]);

    const handleSubmit = useCallback(() => {
      const data = Object.assign({}, modalInfo, {
        deptIds: checkedKeys || [],
        dataScope: selectedScope,
      });
      dataScopeRole(data)
        .then((res: any) => {
          message.success("修改成功");
          form.resetFields();
          modal.resolve(data);
          modal.hide();
        })
        .catch((e) => {
          message.error(e?.msg || "修改失败");
        });
    }, [modal, modalInfo, form, checkedKeys, selectedScope]);
    /* 菜单权限展示操作 */
    const onExpand = useMemo<any>(() => {
      const onExpand = (expandedKeys: never[]) => {
        setExpandedKeys(expandedKeys);
        setAutoExpandParent(false);
      };
      return onExpand;
    }, [expandedKeys]);
    const onCheck = (checkedKeys: React.Key[]) => {
      setCheckedKeys(checkedKeys);
    };

    return (
      <NiceModal
        id={ROLE_DATA_SCOPE_MODAL_ID}
        title={modalInfo ? "修改角色" : "添加角色"}
        okText={"确定"}
        cancelText="取消"
        onOk={handleSubmit}
      >
        <Form.Item name={`roleName`} label={`角色名称`}>
          <Input placeholder={modalInfo?.roleName} disabled />
        </Form.Item>
        <Form.Item name={`roleKey`} label={`权限字符`}>
          <Input placeholder={modalInfo?.roleKey} disabled />
        </Form.Item>
        <Form.Item label={"权限范围"}>
          <Select
            defaultValue={dataScopeOptions[0].value}
            onChange={handleChange}
          >
            {dataScopeOptions.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {selectedScope === "2" && (
          <Form.Item name={`deptIds`} label={`数据权限`}>
            <Tree
              checkable
              checkedKeys={checkedKeys}
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={(checkedKeys: any) => {
                onCheck(checkedKeys as React.Key[]);
              }}
              treeData={deptTreeData}
            ></Tree>
          </Form.Item>
        )}
      </NiceModal>
    );
  }
);
