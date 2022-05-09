import React, { useEffect, useMemo, useState } from "react";
import type { ProColumns } from "@ant-design/pro-table";
import type { IResQueryDictList } from "../service/index.d";
import { PermissionA } from "@/zero/components";
import { useSelectEnum } from "@/common/hooks";
import { queryDictList } from "../../service";

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
        title: "字典名称",
        dataIndex: "dictType",
        hideInTable: true,
        valueType: "select",
        initialValue: dictType,
        valueEnum:
          dictDictType && dictDictType.getEnum && dictDictType?.getEnum(),
      },
      {
        title: "字典编码",
        dataIndex: "dictCode",
        hideInSearch: true,
        width: 80,
      },
      {
        title: "字典标签",
        dataIndex: "dictLabel",
      },
      {
        title: "字典键值",
        dataIndex: "dictValue",
        hideInSearch: true,
      },
      {
        title: "字典排序",
        dataIndex: "dictSort",
        hideInSearch: true,
      },
      {
        title: "状态",
        dataIndex: "status",
        valueEnum: {
          "0": { text: "正常", status: "Success" },
          "1": { text: "停用", status: "Error" },
        },
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
        render: (text, record, index, action) => (
          <>
            <PermissionA
              permissions={["system:dict:edit"]}
              onClick={() => {
                handleUpdate(record.dictCode);
              }}
            >
              修改
            </PermissionA>
            <PermissionA
              danger
              permissions={["system:dict:remove"]}
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
