import React, { useMemo } from "react";
import type { ProColumns } from "@ant-design/pro-components";
import { Space } from "antd";
import type { IResQueryDictList } from "../service/index.d";
import { PermissionA } from "@/zero/components";
import { navigate, useSelectEnum } from "@/zero/api";
import { SYS_COMMON_STATUS } from "@/common/enum/system";
import moment from "moment";

const dictCommonStatus = useSelectEnum(SYS_COMMON_STATUS);

const useColumns = (handleUpdate: Function, handleDelete: Function) => {
  const columns: ProColumns<IResQueryDictList>[] = useMemo(() => {
    return [
      {
        title: "编号",
        dataIndex: "dictId",
        hideInSearch: true,
        hideInTable: true,
      },
      {
        title: "字典名称",
        dataIndex: "dictName",
        ellipsis: true,
      },
      {
        title: "字典类型",
        dataIndex: "dictType",
        ellipsis: true,
        render: (text, record, index, action) => (
          <PermissionA
            type="link"
            onClick={() => {
              navigate.goTo(
                `/system/manage/dictdetail?dictId=${record.dictId}`,
                record
              );
            }}
          >
            {record.dictType}
          </PermissionA>
        ),
      },
      {
        title: "状态",
        dataIndex: "status",
        valueType: "select",
        valueEnum: dictCommonStatus.getEnum({ "1": "Error", "0": "Success" }),
        ellipsis: true,
      },
      {
        title: "备注",
        dataIndex: "remark",
        hideInSearch: true,
        ellipsis: true,
      },
      {
        title: "创建时间",
        dataIndex: "createTime",
        hideInSearch: true,
        width: 150,
        ellipsis: true,
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
        width: 110,
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
