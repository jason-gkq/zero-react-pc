import React, { useMemo } from "react";
import type { ProColumns } from "@ant-design/pro-table";
import { Space } from "antd";
import type { IResQueryDictList } from "../service/index.d";
import { PermissionA } from "@/zero/components";
import { navigate } from "@/src/zero/api";

const useColumns = (
  handleUpdate: Function,
  handleDelete: Function,
  dictNormalDisable: any
) => {
  const columns: ProColumns<IResQueryDictList>[] = useMemo(() => {
    return [
      {
        title: "编号",
        dataIndex: "dictId",
        hideInSearch: true,
      },
      {
        title: "字典名称",
        dataIndex: "dictName",
      },
      {
        title: "字典类型",
        dataIndex: "dictType",
        render: (text, record, index, action) => (
          <Space size='middle'>
            <PermissionA
              type='link'
              onClick={() => {
                navigate.goTo(
                  `/system/dict/data?dictId=${record.dictId}`,
                  record
                );
              }}
            >
              {record.dictType}
            </PermissionA>
          </Space>
        ),
      },
      {
        title: "状态",
        dataIndex: "status",
        valueEnum: dictNormalDisable.getEnum({ "1": "Error", "0": "Success" }),
      },
      {
        title: "备注",
        dataIndex: "remark",
        hideInSearch: true,
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
              permissions={["system:dict:edit"]}
              onClick={() => {
                handleUpdate(record.dictId);
              }}
            >
              修改
            </PermissionA>
            <PermissionA
              danger
              permissions={["system:dict:remove"]}
              onClick={() => {
                handleDelete(record.dictId);
              }}
            >
              删除
            </PermissionA>
          </>
        ),
      },
    ];
  }, []);
  return { columns };
};

export default useColumns;
