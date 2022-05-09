import React, { useEffect, useRef } from "react";
import ProTable from "@ant-design/pro-table";
import { Space, Modal, message } from "antd";
import { PermissionButton, useNiceModal } from "@/zero/components";
import {
  queryPostList,
  exportPost,
  addPost,
  getPost,
  delPost,
} from "../service";
import type { IResQueryPostList, IResAddPost } from "../service/index.d";
import type { ProFormInstance } from "@ant-design/pro-form";
import type { ActionType } from "@ant-design/pro-table";
import PostModal, { MODAL_ID } from "./PostModal";
import { useDownload } from "@/common/hooks";
import useColumns from "../hooks/useColumns";

export default ({ dictNormalDisable, getDictData }: any) => {
  const ref = useRef<ActionType>();
  const formRef = useRef<ProFormInstance>();

  const { show: showModal } = useNiceModal(MODAL_ID);

  const handleAdd = () => {
    showModal({ dictNormalDisable }).then((newInfo) => {
      const res = newInfo as IResAddPost;
      addPost(res)
        .then((response) => {
          message.success("新增成功");
          (ref as any).current.reloadAndRest();
        })
        .catch((e) => {
          message.error(e?.msg || "新增失败");
        });
    });
  };

  const handleDelete = (postId: number | number[]) => {
    Modal.confirm({
      title: '是否确认删除岗位编号为"' + postId + '"的数据项?',
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        delPost(postId)
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

  /** 导出按钮操作 */
  const handleExport = () => {
    Modal.confirm({
      title: "是否确认导出所有岗位数据项?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        exportPost(formRef.current?.getFieldsValue())
          .then((response) => {
            useDownload(response.msg || "");
          })
          .catch((e) => {
            message.error(e?.msg || "文件获取失败失败");
          });
      },
    });
  };

  const handleUpdate = async (postId: number) => {
    const { data } = await getPost(postId);
    showModal({ modalInfo: data, dictNormalDisable }).then(() => {
      (ref as any).current.reloadAndRest();
    });
  };

  useEffect(() => {
    getDictData();
  }, []);

  const columns = useColumns(handleUpdate, handleDelete, dictNormalDisable);

  return (
    <>
      <ProTable<IResQueryPostList>
        rowSelection={{}}
        actionRef={ref}
        columns={columns}
        rowKey={"postId"}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          defaultPageSize: 10,
          defaultCurrent: 1,
        }}
        request={async (params, sort, fliter) => {
          const { current: pageNum, pageSize, ...req } = params;
          const { rows: data, total } = await queryPostList({
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
                const ids = selectedRows.map((item) => item.postId);
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
            permissions={["system:post:add"]}
            onClick={() => handleAdd()}
          >
            新增
          </PermissionButton>,
          <PermissionButton
            size='small'
            type='primary'
            permissions={["system:post:export"]}
            onClick={() => handleExport()}
          >
            导出
          </PermissionButton>,
        ]}
      />
      <PostModal />
    </>
  );
};
