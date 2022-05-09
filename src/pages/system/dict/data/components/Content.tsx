import React, { useRef } from "react";
import ProTable from "@ant-design/pro-table";
import { Space } from "antd";
import { queryDictList } from "../service";
import type { ActionType } from "@ant-design/pro-table";
import type { IResQueryDictList } from "../service/index.d";
import useColumns from "../hooks/useColumns";
import useActions from "../hooks/useActions";
import { MODAL_ID } from "./DictModal";
import DictModal from "../containers/DictModal";
import { PermissionButton, useNiceModal } from "@/zero/components";
import type { ProFormInstance } from "@ant-design/pro-form";

export default ({ $payload }: any) => {
  const formRef = useRef<ProFormInstance>();
  const ref = useRef<ActionType>();
  const { show: showModal } = useNiceModal(MODAL_ID);
  const { dictType } = $payload;

  const { handleDelete, handleUpdate, handleAdd, handleExport } = useActions(
    ref,
    formRef,
    showModal
  );

  const { columns } = useColumns(handleUpdate, handleDelete, dictType);
  return (
    <>
      <ProTable<IResQueryDictList>
        rowSelection={{}}
        actionRef={ref}
        columns={columns}
        rowKey={"dictCode"}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          defaultPageSize: 10,
          defaultCurrent: 1,
        }}
        request={async (params, sort, fliter) => {
          const { current: pageNum, pageSize, ...req } = params;
          const { rows: data, total } = await queryDictList({
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
              permissions={["system:dict:remove"]}
              type='primary'
              size='small'
              onClick={() => {
                const ids = selectedRows.map((item) => item.dictCode).join(",");
                handleDelete(ids);
              }}
            >
              批量删除
            </PermissionButton>
          </Space>
        )}
        toolBarRender={() => [
          <PermissionButton
            type='primary'
            size='small'
            permissions={["system:dict:add"]}
            onClick={() => handleAdd({ dictType })}
          >
            新增
          </PermissionButton>,
          <PermissionButton
            size='small'
            type='primary'
            permissions={["system:dict:export"]}
            onClick={() => handleExport()}
          >
            导出
          </PermissionButton>,
        ]}
      />
      <DictModal />
    </>
  );
};
