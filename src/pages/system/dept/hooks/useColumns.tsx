import React, { useMemo } from "react";
import type { ProColumns } from "@ant-design/pro-table";
import { Switch } from "antd";
import type { IResQueryDepList } from "../service/index.d";
import { PermissionA, useNiceModal } from "@/zero/components";

const useColumns = (handleUpdate: any, handleAdd: any, handleDelete: any) => {
  const { show: showModal } = useNiceModal("system-dept-modal");

  const columns: ProColumns<IResQueryDepList>[] = useMemo(() => {
    return [
      {
        title: "部门名称",
        dataIndex: "deptName",
      },
      {
        title: "排序",
        dataIndex: "orderNum",
        hideInSearch: true,
      },
      {
        title: "状态",
        dataIndex: "status",
        valueType: "select",
        valueEnum: {
          "0": { text: "显示", status: "online" },
          "1": { text: "隐藏", status: "error" },
        },
        render: (text, record) => (
          <Switch
            size='small'
            defaultChecked={!Boolean(Number(record.status))}
            checkedChildren='显示'
            unCheckedChildren='隐藏'
          />
        ),
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        hideInSearch: true,
        valueType: "date",
      },
      {
        title: "操作",
        valueType: "option",
        render: (text, record, index, action) => (
          <>
            <PermissionA
              permissions={["system:dept:edit"]}
              onClick={() => {
                handleUpdate(record.deptId);
              }}
            >
              修改
            </PermissionA>
            <PermissionA
              permissions={["system:dept:add"]}
              onClick={() => {
                handleAdd(record.deptId);
              }}
            >
              新增
            </PermissionA>
            {record.parentId == 0 || (
              <PermissionA
                danger
                permissions={["system:dept:remove"]}
                onClick={() => {
                  handleDelete(record.deptName, record.deptId);
                }}
              >
                删除
              </PermissionA>
            )}
          </>
        ),
      },
    ];
  }, [showModal]);
  return { columns };
};

export default useColumns;
