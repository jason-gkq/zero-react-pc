import React, { useMemo } from "react";
import type { ProColumns } from "@ant-design/pro-table";
import type { IResQueryNoticeList } from "../service/index.d";
import { PermissionA, useNiceModal } from "@/zero/components";
import { MODAL_ID } from "../components/NoticeModal";

const useColumns = (
  handleUpdate: any,
  handleDelete: any,
  dictNoticeStatus: any,
  dictNoticeType: any
) => {
  const { show: showModal } = useNiceModal(MODAL_ID);

  const columns: ProColumns<IResQueryNoticeList>[] = useMemo(() => {
    return [
      {
        title: "序号",
        dataIndex: "noticeId",
        hideInSearch: true,
      },
      {
        title: "公告标题",
        dataIndex: "noticeTitle",
      },
      {
        title: "公告类型",
        dataIndex: "noticeType",
        valueEnum: dictNoticeType.getEnum(),
      },
      {
        title: "状态",
        dataIndex: "status",
        hideInSearch: true,
        valueEnum: dictNoticeStatus.getEnum(),
      },
      {
        title: "创建者",
        dataIndex: "createBy",
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
              permissions={["system:notice:edit"]}
              onClick={() => {
                handleUpdate(record.noticeId);
              }}
            >
              修改
            </PermissionA>
            <PermissionA
              danger
              permissions={["system:notice:remove"]}
              onClick={() => {
                handleDelete(record.noticeId);
              }}
            >
              删除
            </PermissionA>
          </>
        ),
      },
    ];
  }, [showModal, handleUpdate, handleDelete, dictNoticeStatus, dictNoticeType]);
  return { columns };
};

export default useColumns;
