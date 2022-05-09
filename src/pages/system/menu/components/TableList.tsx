import React, { useRef } from "react";
import ProTable from "@ant-design/pro-table";
import { Modal, message } from "antd";
import { queryMenuList, delMenu } from "../service";
import type { ActionType } from "@ant-design/pro-table";
import type { IResQueryMenuList } from "../service/index.d";
import { arrayToTree } from "@/zero/utils";
import useColumns from "../hooks/useColumns";
import { PermissionA, useNiceModal } from "@/zero/components";
import { MODAL_ID } from "./MenuModal";
import MenuModal from "../containers/MenuModal";

export default () => {
  const { show: showModal } = useNiceModal(MODAL_ID);
  const ref = useRef<ActionType>();

  /* 查询菜单下拉树结构 */
  const getTreeselect = async (params?: any) => {
    const { data } = await queryMenuList(params);
    const res = arrayToTree(data, "menuId", "parentId");
    const deletEmpty = (data: any) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i]["children"] && data[i]["children"].length > 0) {
          deletEmpty(data[i]["children"]);
        } else {
          Reflect.deleteProperty(data[i], "children");
        }
      }
      return data;
    };
    return deletEmpty(res);
  };
  /** 修改按钮操作 */
  const handleUpdate = async (row: IResQueryMenuList) => {
    const treeData = await getTreeselect();
    showModal({ modalInfo: row, menuOptions: treeData, tag: "update" }).then(
      () => {
        (ref as any).current.reloadAndRest();
      }
    );
  };

  /** 新增按钮操作 */
  const handleAdd = async (row?: IResQueryMenuList) => {
    const treeData = await getTreeselect();
    showModal({
      modalInfo: {
        parentId: (row && row.menuId) || 0,
        menuType: "M",
      },
      menuOptions: treeData,
      tag: "add",
    }).then(() => {
      (ref as any).current.reloadAndRest();
    });
  };

  const handleDelete = async (row: IResQueryMenuList) => {
    Modal.confirm({
      title: '是否确认删除名称为"' + row.menuName + '"的数据项?',
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        delMenu(row.menuId)
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

  const { columns } = useColumns(handleUpdate, handleAdd, handleDelete);
  return (
    <>
      <ProTable<IResQueryMenuList>
        actionRef={ref}
        columns={columns}
        rowKey={"menuId"}
        pagination={false}
        request={async (params: any, sort, fliter) => {
          const treeData = await getTreeselect(params);
          return {
            data: treeData,
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
        toolBarRender={() => [
          <PermissionA
            size='small'
            type='primary'
            permissions={["system:role:add"]}
            onClick={handleAdd}
          >
            新增
          </PermissionA>,
        ]}
      />
      <MenuModal />
    </>
  );
};
