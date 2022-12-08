import React, { useMemo } from "react";
import type { ProColumns } from "@ant-design/pro-components";
import type { IResQueryNoticeList } from "../service/index.d";
import { useSelectEnum, PermissionA, useNiceModal } from "@/zero";
import { MODAL_ID } from "../components/NoticeModal";
import { SYS_COMMON_STATUS, SYS_NOTICE_TYPE } from "@/common/enum/system";
import moment from "moment";

const dictNoticeStatus = useSelectEnum(SYS_COMMON_STATUS);
const dictNoticeType = useSelectEnum(SYS_NOTICE_TYPE);

const useColumns = (handleUpdate: any, handleDelete: any) => {
  const { show: showModal } = useNiceModal(MODAL_ID);

  const columns: ProColumns<IResQueryNoticeList>[] = useMemo(() => {
    return [
      {
        title: "序号",
        dataIndex: "noticeId",
        hideInSearch: true,
        hideInTable: true,
      },
      {
        title: "公告标题",
        dataIndex: "noticeTitle",
      },
      {
        title: "公告类型",
        dataIndex: "noticeType",
        valueType: "select",
        valueEnum: dictNoticeType.getEnum(),
      },
      {
        title: "状态",
        dataIndex: "status",
        hideInSearch: true,
        valueEnum: dictNoticeStatus.getEnum({
          "1": "Error",
          "0": "Success",
        }),
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
