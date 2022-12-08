import React, { useState, useRef, useMemo } from "react";
import { ProTable } from "@ant-design/pro-components";
import { Space, Modal, message } from "antd";
import { useSelectEnum, PermissionButton } from "@/zero";
import { useDownload } from "@/common/hooks";
import { queryUserList, delUser, changeStatus, exportUser } from "../service";
import type { ActionType, ProFormInstance } from "@ant-design/pro-components";
import type { IResQueryUserList, IDeptTreeData } from "../service/index.d";
import { SYS_COMMON_STATUS, SYS_USER_SEX } from "@/common/enum/system";
import Update from "./Update";
import useColumns from "../hooks/useColumns";

const dictNormalDisable = useSelectEnum(SYS_COMMON_STATUS, "value", "label");
const dictUserSex = useSelectEnum(SYS_USER_SEX, "value", "label");
type IProps = {
  deptId?: number;
  deptTreeData: IDeptTreeData[];
};

export default ({ deptId, deptTreeData }: IProps) => {
  const ref: any = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isUploadModalVisible, setIsUploadModalVisible] =
    useState<boolean>(false);
  const [userId, setUserId] = useState<number>();

  const [delteUser, changeUserStatus, updateThen, exportSearchUser] =
    useMemo(() => {
      const updateThen = (flag: boolean) => {
        flag && ref.current.reloadAndRest();
        setIsModalVisible(false);
      };
      const delteUser = (userIds: string) => {
        Modal.confirm({
          title: `是否确认删除用户编号为“${userIds}”的用户?`,
          okText: "确定",
          cancelText: "取消",
          onOk: () => {
            delUser(userIds)
              .then(() => {
                message.success("删除成功");
                ref.current.reloadAndRest();
              })
              .catch((e) => {
                message.error(e?.msg || "删除失败");
              });
          },
        });
      };
      const changeUserStatus = (record: IResQueryUserList, status: boolean) => {
        Modal.confirm({
          title: `确定要${status ? "启用" : "停用"}用户：${record.userName}？`,
          okText: "确定",
          cancelText: "取消",
          onOk: () => {
            changeStatus({ userId: record.userId, status: status ? "0" : "1" })
              .then(() => {
                message.success("操作成功");
                ref.current.reload();
              })
              .catch((e) => {
                message.error(e?.msg || "操作失败");
              });
          },
        });
      };

      const exportSearchUser = () => {
        Modal.confirm({
          title: `是否确认导出所有用户数据项?`,
          okText: "确定",
          cancelText: "取消",
          onOk: () => {
            exportUser(formRef.current?.getFieldsValue())
              .then((response) => {
                useDownload(response.msg || "");
              })
              .catch((e) => {
                message.error(e?.msg || "文件获取失败失败");
              });
          },
        });
      };

      return [delteUser, changeUserStatus, updateThen, exportSearchUser];
    }, []);

  const columns = useColumns(
    changeUserStatus,
    setUserId,
    setIsModalVisible,
    delteUser,
    dictNormalDisable
  );

  return (
    <>
      <Update
        isModalVisible={isModalVisible}
        deptTreeData={deptTreeData}
        setIsModalVisible={updateThen}
        userId={userId}
        dictNormalDisable={dictNormalDisable}
        dictUserSex={dictUserSex}
      />
      <ProTable<IResQueryUserList>
        rowSelection={{
          getCheckboxProps: (record: IResQueryUserList) => ({
            disabled: record.admin, // Column configuration not to be checked
          }),
        }}
        params={{ deptId }}
        actionRef={ref}
        formRef={formRef}
        columns={columns}
        rowKey={"userId"}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          defaultPageSize: 10,
          defaultCurrent: 1,
          // onChange: (page, pageSize) => {
          //   console.log("pagination.onChange", page, pageSize);
          // },
        }}
        // polling={polling || undefined}
        request={async (params, sort, fliter) => {
          const { current: pageNum, pageSize, ...req } = params;
          const { rows: data, total } = await queryUserList({
            pageNum,
            pageSize,
            ...req,
          });
          return {
            data,
            total,
            success: true,
          };
        }}
        onRequestError={(error) => {
          console.error(error);
        }}
        options={{
          fullScreen: false,
          reload: false,
          setting: false,
          density: false,
        }}
        search={{ defaultCollapsed: false }}
        defaultSize="small"
        dateFormatter="string"
        tableAlertRender={({
          selectedRowKeys,
          selectedRows,
          onCleanSelected,
        }) => (
          <Space size={6}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        tableAlertOptionRender={({
          selectedRowKeys,
          selectedRows,
          onCleanSelected,
        }) => (
          <Space size={6}>
            <PermissionButton
              permissions={["system:user:remove"]}
              type="primary"
              size="small"
              danger
              disabled={!Boolean(selectedRowKeys.length)}
              onClick={() => {
                delteUser(selectedRowKeys.join(","));
              }}
            >
              批量删除
            </PermissionButton>
          </Space>
        )}
        toolBarRender={() => [
          <PermissionButton
            permissions={["system:user:add"]}
            type="primary"
            size="small"
            onClick={() => {
              setUserId(undefined);
              setIsModalVisible(true);
            }}
          >
            新增
          </PermissionButton>,
        ]}
      />
    </>
  );
};
