import React, { useRef, useMemo, useEffect } from "react";
import ProTable from "@ant-design/pro-table";
import { Space } from "antd";
import type { ActionType } from "@ant-design/pro-table";
import { PermissionButton, NiceModal, useNiceModal } from "@/zero/components";
import { MODAL_ID } from "./NoticeModal";
import NoticeModal from "../containers/NoticeModal";
import { queryNoticeList, getNotice, delNotice } from "../service";
import type { IResQueryNoticeList } from "../service/index.d";
import useColumns from "../hooks/useColumns";

export default ({ getDictData, dictNoticeStatus, dictNoticeType }: any) => {
  const { show: showModal } = useNiceModal(MODAL_ID);
  const ref = useRef<ActionType>();

  useEffect(() => {
    getDictData();
  }, []);

  const [
    handleAdd,
    handleDelete,
    handleUpdate,
    multipleUpdate,
    multipleDelete,
  ] = useMemo(() => {
    const handleAdd = () => {
      showModal().then(() => {
        (ref as any).current.reloadAndRest();
      });
    };

    /** 删除按钮操作 */
    const handleDelete = (noticeId: number | number[]) => {
      NiceModal.niceConfirm({
        title: '是否确认删除公告编号为"' + noticeId + '"的数据项?',
        onOk: delNotice,
        payload: noticeId,
      });
      // Modal.confirm({
      //   title: '是否确认删除公告编号为"' + noticeId + '"的数据项?',
      //   okText: "确定",
      //   cancelText: "取消",
      //   onOk: () => {
      //     delNotice(noticeId)
      //       .then(() => {
      //         message.success("删除成功");
      //         (ref as any).current.reloadAndRest();
      //       })
      //       .catch((e) => {
      //         message.error(e?.msg || "删除失败");
      //       });
      //   },
      // });
    };

    /** 修改按钮操作 */
    const handleUpdate = async (noticeId: number | number[]) => {
      const { data } = await getNotice(noticeId);
      if (!data) return;
      showModal({
        modalInfo: {
          ...data,
          noticeId: noticeId,
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
      handleAdd,
      handleDelete,
      handleUpdate,
      multipleUpdate,
      multipleDelete,
    ];
  }, []);

  const { columns } = useColumns(
    handleUpdate,
    handleDelete,
    dictNoticeStatus,
    dictNoticeType
  );
  return (
    <>
      <ProTable<IResQueryNoticeList>
        rowSelection={{}}
        actionRef={ref}
        columns={columns}
        rowKey={"noticeId"}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          defaultPageSize: 10,
          defaultCurrent: 1,
        }}
        request={async (params, sort, fliter) => {
          const { current: pageNum, pageSize, ...req } = params;
          const { rows: data, total } = await queryNoticeList({
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
              permissions={["system:notice:edit"]}
              type='primary'
              size='small'
              onClick={() => {
                const ids = selectedRows.map(item => item.noticeId)
                multipleUpdate(ids)
              }}
            >
              批量修改
            </PermissionButton> */}
            <PermissionButton
              permissions={["system:notice:remove"]}
              type='primary'
              size='small'
              onClick={() => {
                const ids = selectedRows.map((item) => item.noticeId);
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
            permissions={["system:notice:add"]}
            onClick={() => handleAdd()}
          >
            新增
          </PermissionButton>,
        ]}
      />
      <NoticeModal />
    </>
  );
};
