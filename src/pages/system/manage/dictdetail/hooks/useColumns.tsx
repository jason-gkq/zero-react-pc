import React, { useEffect, useMemo, useState } from "react";
import type { ProColumns } from "@ant-design/pro-components";
import type { IResQueryDictList } from "../service/index.d";
import { PermissionA } from "@/zero/components";
import { useSelectEnum } from "@/zero/api";
import { queryDictList } from "../../dict/service";

const useColumns = (
  handleUpdate: Function,
  handleDelete: Function,
  dictType: string
) => {
  const [dictDictType, setDictDictType] = useState<any>({});

  useEffect(() => {
    queryDictList({}).then(({ rows }) => {
      setDictDictType(useSelectEnum(rows, "dictType", "dictName"));
    });
  }, []);

  const columns: ProColumns<IResQueryDictList>[] = useMemo(() => {
    return [
      {
        title: "字典类型",
        dataIndex: "dictType",
        hideInSearch: true,
        valueType: "select",
        initialValue: dictType,
        ellipsis: true,
      },
      {
        title: "字典名称",
        dataIndex: "dictType",
        hideInTable: false,
        valueType: "select",
        initialValue: dictType,
        valueEnum:
          dictDictType && dictDictType.getEnum && dictDictType?.getEnum(),
        ellipsis: true,
      },
      {
        title: "数据编码",
        dataIndex: "dictCode",
        hideInSearch: true,
        hideInTable: true,
        ellipsis: true,
      },
      {
        title: "数据标签",
        dataIndex: "dictLabel",
        ellipsis: true,
      },
      {
        title: "数据键值",
        dataIndex: "dictValue",
        hideInSearch: true,
        ellipsis: true,
      },
      {
        title: "显示排序",
        dataIndex: "dictSort",
        hideInSearch: true,
        width: 90,
        ellipsis: true,
      },
      {
        title: "状态",
        dataIndex: "status",
        valueEnum: {
          "0": { text: "正常", status: "Success" },
          "1": { text: "停用", status: "Error" },
        },
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
      // {
      //   title: "创建时间",
      //   dataIndex: "createTime",
      //   valueType: "dateRange",
      //   hideInTable: true,
      //   hideInSearch: true,
      //   search: {
      //     transform: (value) => {
      //       return {
      //         beginTime: value[0],
      //         endTime: value[1],
      //       };
      //     },
      //   },
      // },
      {
        title: "操作",
        valueType: "option",
        width: 110,
        render: (text, record, index, action) => (
          <>
            <PermissionA
              permissions={["system:dictDetail:edit"]}
              onClick={() => {
                handleUpdate(record.dictCode);
              }}
            >
              修改
            </PermissionA>
            <PermissionA
              danger
              permissions={["system:dictDetail:remove"]}
              onClick={() => {
                handleDelete(record.dictCode);
              }}
            >
              删除
            </PermissionA>
          </>
        ),
      },
    ];
  }, [dictDictType, dictType]);
  return { columns };
};

export default useColumns;
