import React, { useEffect, useRef } from "react";
import ProTable from "@ant-design/pro-table";
import { Space, Modal, message } from "antd";
import { queryDictList } from "../service";
import type { ActionType } from "@ant-design/pro-table";
import type { IResQueryDictList } from "../service/index.d";
import useColumns from "../hooks/useColumns";
import { MODAL_ID } from "./DictModal";
import DictModal from "../containers/DictModal";
import { PermissionButton, useNiceModal } from "@/zero/components";
import type { ProFormInstance } from "@ant-design/pro-form";
import { useDownload } from "@/common/hooks";
import { delType, getType, exportType } from "../service";

export default (props: any) => {
  const { dictNormalDisable, getDictData } = props;
  const formRef = useRef<ProFormInstance>();
  const ref = useRef<ActionType>();
  const { show: showModal } = useNiceModal(MODAL_ID);

  useEffect(() => {
    getDictData();
  }, []);

  /** 删除按钮操作 */
  const handleDelete = (dictId: number | number[]) => {
    Modal.confirm({
      title: '是否确认删除字典编号为"' + dictId + '"的数据项?',
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        delType(dictId)
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
  const handleUpdate = async (dictId: number) => {
    const { data } = await getType(dictId);
    if (!data) return;
    showModal({
      modalInfo: {
        ...data,
        dictId: dictId,
      },
    }).then(() => {
      (ref as any).current.reloadAndRest();
    });
  };

  const handleAdd = () => {
    showModal().then(() => {
      (ref as any).current.reloadAndRest();
    });
  };

  /** 导出按钮操作 */
  const handleExport = () => {
    Modal.confirm({
      title: "是否确认导出所有类型数据项?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        exportType(formRef.current?.getFieldsValue())
          .then((response) => {
            useDownload(response.msg || "");
          })
          .catch((e) => {
            message.error(e?.msg || "文件获取失败失败");
          });
      },
    });
  };

  /* 批量删除 */
  const multipleDelete = (ids: number[]) => {
    handleDelete(ids);
  };

  const { columns } = useColumns(handleUpdate, handleDelete, dictNormalDisable);
  return (
    <>
      <ProTable<IResQueryDictList>
        rowSelection={{}}
        actionRef={ref}
        columns={columns}
        rowKey={"dictId"}
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
                const ids = selectedRows.map((item) => item.dictId);
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
            permissions={["system:dict:add"]}
            onClick={() => handleAdd()}
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
