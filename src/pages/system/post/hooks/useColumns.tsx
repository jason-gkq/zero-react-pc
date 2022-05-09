import React, { useMemo } from "react";
import type { IResQueryPostList } from "../service/index.d";
import { PermissionA, useNiceModal } from "@/zero/components";
import type { ProColumns } from "@ant-design/pro-table";

const useColumns = (
  handleUpdate: Function,
  handleDelete: Function,
  dictNormalDisable: any
) => {
  const { show: showModal } = useNiceModal("system-post-modal");

  const columns: ProColumns<IResQueryPostList>[] = useMemo(() => {
    return [
      {
        title: "岗位编号",
        dataIndex: "postId",
        hideInSearch: true,
      },
      {
        title: "岗位编码",
        dataIndex: "postCode",
      },
      {
        title: "岗位名称",
        dataIndex: "postName",
      },
      {
        title: "岗位排序",
        dataIndex: "postSort",
        hideInSearch: true,
      },
      {
        title: "状态",
        dataIndex: "status",
        valueEnum: dictNormalDisable.getEnum({ "1": "Error", "0": "Success" }),
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
        hideInSearch: true,
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
              permissions={["system:post:edit"]}
              onClick={() => {
                handleUpdate(record.postId);
              }}
            >
              修改
            </PermissionA>
            <PermissionA
              danger
              permissions={["system:post:remove"]}
              onClick={() => {
                handleDelete(record.postId);
              }}
            >
              删除
            </PermissionA>
          </>
        ),
      },
    ];
  }, [showModal, dictNormalDisable]);

  return columns;
};

export default useColumns;
