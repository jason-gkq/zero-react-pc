import React, { useMemo } from "react";
import type { ProColumns } from "@ant-design/pro-components";
import type { IResQueryMenuList } from "../service/index.d";
import { PermissionA } from "@/zero/components";
import moment from "moment";

const useColumns = (
  handleUpdate: Function,
  handleAdd: Function,
  handleDelete: Function,
  treeData: any,
  ref: any
) => {
  const columns: ProColumns<IResQueryMenuList>[] = useMemo(() => {
    return [
      {
        title: "菜单名称",
        dataIndex: "menuName",
        ellipsis: true,
      },
      {
        title: "图标",
        dataIndex: "icon",
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: "排序",
        dataIndex: "orderNum",
        hideInSearch: true,
        width: 70,
      },
      {
        title: "权限标识",
        dataIndex: "perms",
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: "组件路径",
        dataIndex: "component",
        hideInSearch: true,
        ellipsis: true,
      },
      {
        title: "状态",
        dataIndex: "visible",
        valueType: "select",
        valueEnum: {
          "0": { text: "显示", status: "Success" },
          "1": { text: "隐藏", status: "Error" },
        },
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        hideInSearch: true,
        hideInTable: false,
        valueType: "dateTime",
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        valueType: "dateRange",
        hideInTable: true,
        fieldProps: {
          disabledDate: (current: any) => {
            return current && current > moment().endOf("day");
          },
        },
        search: {
          transform: (value) => {
            return {
              beginTime: value[0],
              endTime: value[1],
            };
          },
        },
      },
      {
        title: "操作",
        valueType: "option",
        render: (text, record, index, action) => (
          <>
            <PermissionA
              permissions={["system:menu:edit"]}
              onClick={() => handleUpdate(record)}
            >
              修改
            </PermissionA>
            <PermissionA
              permissions={["system:menu:add"]}
              onClick={() => handleAdd(record)}
            >
              新增
            </PermissionA>
            <PermissionA
              danger
              permissions={["system:menu:remove"]}
              onClick={() => handleDelete(record)}
            >
              删除
            </PermissionA>
          </>
        ),
      },
    ];
  }, [JSON.stringify(treeData), ref.current]);
  return { columns };
};

export default useColumns;
