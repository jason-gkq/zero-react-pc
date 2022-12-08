import React, { useRef } from "react";
import { ProTable } from "@ant-design/pro-components";
import { Space } from "antd";
import { queryDictList } from "../service";
import type { ActionType, ProFormInstance } from "@ant-design/pro-components";
import type { IResQueryDictList } from "../service/index.d";
import useColumns from "../hooks/useColumns";
import useActions from "../hooks/useActions";
import { MODAL_ID } from "./DictModal";
import DictModal from "./DictModal";
import { useEnv, PermissionButton, useNiceModal } from "@/zero";

export default ({ $payload }: any) => {
  const formRef = useRef<ProFormInstance>();
  const ref = useRef<ActionType>();
  const { show: showModal } = useNiceModal(MODAL_ID);
  const { dictType } = $payload;

  const { handleDelete, handleUpdate, handleAdd } = useActions(
    ref,
    formRef,
    showModal
  );

  const { columns } = useColumns(handleUpdate, handleDelete, dictType);
  return (
    <>
      <ProTable<IResQueryDictList>
        tableClassName="page-content-min-height"
        rowSelection={{}}
        actionRef={ref}
        columns={columns}
        rowKey={"dictCode"}
        pagination={useEnv()?.pagination}
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
        search={{
          filterType: "light",
        }}
        cardProps={{
          bodyStyle: { padding: "0 10px 10px 10px" },
        }}
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
              permissions={["system:dict:remove"]}
              type="primary"
              size="small"
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
            type="primary"
            size="small"
            permissions={["system:dictDetail:add"]}
            onClick={() => handleAdd({ dictType })}
          >
            新增
          </PermissionButton>,
        ]}
      />
      <DictModal />
    </>
  );
};
