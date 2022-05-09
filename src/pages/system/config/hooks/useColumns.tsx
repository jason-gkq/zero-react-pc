import React, { useMemo } from "react";
import type { ProColumns } from "@ant-design/pro-table";
import type { IResQueryConfigList } from "../service/index.d";
import { PermissionA, useNiceModal } from "@/zero/components";

const useColumns = (handleUpdate: any, handleDelete: any, dictYesNo: any) => {
  const { show: showModal } = useNiceModal("system-config-modal");

  const columns: ProColumns<IResQueryConfigList>[] = useMemo(() => {
    return [
      {
        title: "参数主键",
        width: 80,
        dataIndex: "configId",
        hideInSearch: true,
      },
      {
        title: "参数名称",
        ellipsis: true,
        copyable: true,
        dataIndex: "configName",
      },
      {
        title: "参数键名",
        ellipsis: true,
        copyable: true,
        dataIndex: "configKey",
      },
      {
        title: "参数键值",
        dataIndex: "configValue",
        hideInSearch: true,
      },
      {
        title: "系统内置",
        width: 80,
        dataIndex: "configType",
        valueEnum: dictYesNo.getEnum(),
      },
      {
        title: "备注",
        dataIndex: "remark",
        hideInSearch: true,
        ellipsis: true,
        copyable: true,
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        hideInSearch: true,
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        valueType: "dateRange",
        hideInTable: true,
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
              permissions={["system:config:edit"]}
              onClick={() => {
                handleUpdate(record.configId);
              }}
            >
              修改
            </PermissionA>
            <PermissionA
              danger
              permissions={["system:config:remove"]}
              onClick={() => {
                handleDelete(record.configId);
              }}
            >
              删除
            </PermissionA>
          </>
        ),
      },
    ];
  }, [showModal, handleUpdate, handleDelete, dictYesNo]);
  return { columns };
};

export default useColumns;
