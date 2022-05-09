import React, { useRef, useEffect } from "react";
import ProTable from "@ant-design/pro-table";
import { Space } from "antd";
import type { ActionType } from "@ant-design/pro-table";
import type { IResQueryRoleList } from "../service/index.d";
import { queryRoleList } from "../service";
import { PermissionA, PermissionButton, useNiceModal } from "@/zero/components";
import type { ProFormInstance } from "@ant-design/pro-form";
import { ROLE_MODAL_ID } from "./RoleModal";
import RoleModal from "../containers/RoleModal";
import DataScopeModal, { ROLE_DATA_SCOPE_MODAL_ID } from "./DataScopeModal";

import useColumns from "../hooks/useColumns";
import useContentActions from "../hooks/useContentActions";

export default ({ dictNormalDisable, getDictData }: any) => {
  const formRef = useRef<ProFormInstance>();
  const { show: showRoleModal } = useNiceModal(ROLE_MODAL_ID);
  const { show: showRoleDataModal } = useNiceModal(ROLE_DATA_SCOPE_MODAL_ID);
  const ref: any = useRef<ActionType>();

  useEffect(() => {
    getDictData();
  }, []);

  const {
    handleAdd,
    handleUpdate,
    handleExport,
    handleDelete,
    handleDataScope,
    changeUserStatus,
  } = useContentActions(ref, formRef, showRoleModal, showRoleDataModal);

  const { columns } = useColumns(
    handleUpdate,
    handleDataScope,
    handleDelete,
    changeUserStatus,
    dictNormalDisable
  );

  return (
    <>
      <ProTable<IResQueryRoleList>
        rowSelection={{}}
        actionRef={ref}
        formRef={formRef}
        columns={columns}
        rowKey={"roleId"}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          defaultPageSize: 10,
          defaultCurrent: 1,
        }}
        request={async (params) => {
          const { current: pageNum, pageSize, ...req } = params;
          const { rows: data, total } = await queryRoleList({
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
        defaultSize='small'
        dateFormatter='string'
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
              permissions={["system:post:remove"]}
              type='primary'
              size='small'
              onClick={() => {
                const ids = selectedRows.map((item) => item.roleId);
                handleDelete(ids);
              }}
            >
              批量删除
            </PermissionButton>
          </Space>
        )}
        toolBarRender={() => [
          <PermissionA
            size='small'
            type='primary'
            permissions={["system:role:add"]}
            onClick={() => handleAdd()}
          >
            新增
          </PermissionA>,
          <PermissionA
            permissions={["system:role:export"]}
            size='small'
            type='primary'
            onClick={handleExport}
          >
            导出
          </PermissionA>,
        ]}
      />
      <RoleModal />
      <DataScopeModal />
    </>
  );
};
