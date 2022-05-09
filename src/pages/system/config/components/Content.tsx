import React, { useRef, useMemo, useEffect } from "react";
import ProTable from "@ant-design/pro-table";
import { Space, Modal, message } from "antd";
import type { ActionType } from "@ant-design/pro-table";
import { PermissionButton, useNiceModal } from "@/zero/components";
import { MODAL_ID } from "./ConfigModal";
import ConfigModal from "../containers/ConfigModal";
import { useDownload } from "@/common/hooks";
import type { ProFormInstance } from "@ant-design/pro-form";
import useColumns from "../hooks/useColumns";
import type { IResQueryConfigList, IResAddConfig } from "../service/index.d";
import {
  queryConfigList,
  getConfig,
  delConfig,
  exportConfig,
} from "../service";

export default ({ getDictData, dictYesNo }: any) => {
  const { show: showModal } = useNiceModal(MODAL_ID);
  const formRef = useRef<ProFormInstance>();
  const ref = useRef<ActionType>();

  useEffect(() => {
    getDictData();
  }, []);

  const [
    handleExport,
    handleAdd,
    handleDelete,
    handleUpdate,
    multipleUpdate,
    multipleDelete,
  ] = useMemo(() => {
    /** 导出按钮操作 */
    const handleExport = () => {
      Modal.confirm({
        title: "是否确认导出所有参数数据项?",
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          exportConfig(formRef.current?.getFieldsValue())
            .then((response) => {
              useDownload(response.msg || "");
            })
            .catch((e) => {
              message.error(e?.msg || "文件获取失败失败");
            });
        },
      });
    };

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

    /* 批量修改 */
    const multipleUpdate = (ids: number[]) => {
      handleUpdate(ids);
    };

    /* 批量删除 */
    const multipleDelete = (ids: number[]) => {
      handleDelete(ids);
    };

    return [
      handleExport,
      handleAdd,
      handleDelete,
      handleUpdate,
      multipleUpdate,
      multipleDelete,
    ];
  }, []);

  const { columns } = useColumns(handleUpdate, handleDelete, dictYesNo);
  return (
    <>
      <ProTable<IResQueryConfigList>
        rowSelection={{}}
        actionRef={ref}
        columns={columns}
        rowKey={"configId"}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          defaultPageSize: 10,
          defaultCurrent: 1,
        }}
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
            {/* <PermissionButton
              permissions={["system:config:edit"]}
              type='primary'
              size='small'
              onClick={() => {
                const ids = selectedRows.map(item => item.configId)
                multipleUpdate(ids)
              }}
            >
              批量修改
            </PermissionButton> */}
            <PermissionButton
              permissions={["system:config:remove"]}
              type='primary'
              size='small'
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
            type='primary'
            size='small'
            permissions={["system:config:add"]}
            onClick={() => handleAdd()}
          >
            新增
          </PermissionButton>,
          <PermissionButton
            size='small'
            type='primary'
            permissions={["system:config:export"]}
            onClick={() => handleExport()}
          >
            导出
          </PermissionButton>,
        ]}
      />
      <ConfigModal />
    </>
  );
};
