import React, { useMemo } from "react";
import type { ProColumns } from "@ant-design/pro-components";
import { Switch } from "antd";
import type { IResQueryUserList } from "../service/index.d";
import { PermissionA } from "@/zero";

const useColumns = (
  changeUserStatus: Function,
  setUserId: Function,
  setIsModalVisible: Function,
  delteUser: Function,
  dictNormalDisable: any
) => {
  const columns: ProColumns<IResQueryUserList>[] = useMemo(() => {
    return [
      {
        title: "编号",
        dataIndex: "userId",
        hideInSearch: true,
        width: 60,
      },
      {
        title: "名称",
        dataIndex: "userName",
      },
      {
        title: "手机号码",
        dataIndex: "phonenumber",
        hideInTable: true,
      },
      {
        title: "昵称",
        dataIndex: "nickName",
        hideInSearch: true,
      },
      {
        title: "角色",
        dataIndex: "nickName",
        ellipsis: true,
        hideInSearch: true,
        renderText: (text, record) => {
          const roles = record.roles;
          if (!roles || roles.length <= 0) {
            return "-";
          }
          const showRoles: string[] = [];
          roles.forEach((item) => {
            showRoles.push(item.roleName);
          });
          return showRoles.join("，") || "-";
        },
      },
      {
        title: "部门",
        dataIndex: "deptName",
        hideInSearch: true,
        ellipsis: true,
        renderText: (text, record) => record.dept && record.dept.deptName,
      },
      {
        title: "状态",
        dataIndex: "status",
        valueType: "select",
        valueEnum: dictNormalDisable.getEnum(),
        render: (_, record, index, action) => (
          <Switch
            size="small"
            // defaultChecked={!Boolean(Number(record.status))}
            disabled={record.admin}
            // checkedChildren='正常'
            checkedChildren={dictNormalDisable.getLabel("0")}
            unCheckedChildren={dictNormalDisable.getLabel("1")}
            checked={!Boolean(Number(record.status))}
            onClick={(e) => {
              changeUserStatus(record, e);
            }}
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
        render: (text, record, index, action) =>
          !record.admin && (
            <>
              <PermissionA
                permissions={["system:user:edit"]}
                onClick={() => {
                  setUserId(record.userId);
                  setIsModalVisible(true);
                }}
              >
                修改
              </PermissionA>
              <PermissionA
                danger
                permissions={["system:user:remove"]}
                onClick={() => {
                  delteUser(String(record.userId));
                }}
              >
                删除
              </PermissionA>
            </>
          ),
      },
    ];
  }, [dictNormalDisable]);
  return columns;
};

export default useColumns;
