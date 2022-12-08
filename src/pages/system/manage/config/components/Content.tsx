import React, { useRef, useMemo } from "react";
import { ProTable } from "@ant-design/pro-components";
import { Space, Modal, message } from "antd";
import type { ActionType } from "@ant-design/pro-components";
import { useEnv, useSelectEnum, PermissionButton, useNiceModal } from "@/zero";
import ConfigModal, { MODAL_ID } from "./ConfigModal";
import useColumns from "../hooks/useColumns";
import type { IResQueryConfigList } from "../service/index.d";
import { queryConfigList, getConfig, delConfig } from "../service";

import { SYS_YES_NO } from "@/common/enum/system";

const dictYesNo = useSelectEnum(SYS_YES_NO);

export default () => {
  const { show: showModal } = useNiceModal(MODAL_ID);
  const ref = useRef<ActionType>();

  const [handleAdd, handleDelete, handleUpdate, multipleDelete] =
    useMemo(() => {
      const handleAdd = () => {
        showModal().then(() => {
          (ref as any).current.reloadAndRest();
        });
      };

      /** 删除按钮操作 */
      const handleDelete = (configid: number | number[]) => {
        Modal.confirm({
          title: '是否确认删除参数编号为"' + configid + '"的数据项?',
          okText: "确定",
          cancelText: "取消",
          onOk: () => {
            delConfig(configid)
              .then(() => {
                message.success("删除成功");
                (ref as any).current.reloadAndRest();
              })
              .catch((e) => {
                message.error(e?.msg || "删除失败");
              });
          },
        });
      };

      /** 修改按钮操作 */
      const handleUpdate = async (configid: number | number[]) => {
        const { data } = await getConfig(configid);
        if (!data) return;
        showModal({
          modalInfo: {
            ...data,
            noticeId: configid,
          },
        }).then(() => {
          (ref as any).current.reloadAndRest();
        });
      };

      /* 批量删除 */
      const multipleDelete = (ids: number[]) => {
        handleDelete(ids);
      };

      return [handleAdd, handleDelete, handleUpdate, multipleDelete];
    }, []);

  const { columns } = useColumns(handleUpdate, handleDelete, dictYesNo);
  return (
    <>
      <ProTable<IResQueryConfigList>
        tableClassName="page-content-min-height"
        rowSelection={{}}
        actionRef={ref}
        columns={columns}
        rowKey={"configId"}
        pagination={useEnv()?.pagination}
        request={async (params, sort, fliter) => {
          const { current: pageNum, pageSize, ...req } = params;
          const { rows: data, total } = await queryConfigList({
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
              permissions={["system:config:remove"]}
              type="primary"
              size="small"
              onClick={() => {
                const ids = selectedRows.map((item) => item.configId);
                multipleDelete(ids);
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
            permissions={["system:config:add"]}
            onClick={() => handleAdd()}
          >
            新增
          </PermissionButton>,
        ]}
      />
      <ConfigModal />
    </>
  );
};
