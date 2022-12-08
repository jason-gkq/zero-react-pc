import React, { useCallback, useRef, useState } from "react";
import { ProTable } from "@ant-design/pro-components";
import { Modal, message } from "antd";
import { queryMenuList, delMenu } from "../service";
import type { ActionType } from "@ant-design/pro-components";
import type { IResQueryMenuList } from "../service/index.d";
import useColumns from "../hooks/useColumns";
import { arrayToTree, PermissionA, useNiceModal } from "@/zero";
import { MODAL_ID } from "./MenuModal";
import MenuModal from "./MenuModal";

export default () => {
  const { show: showModal } = useNiceModal(MODAL_ID);
  const ref: any = useRef<ActionType>();
  const [treeData, setTreeData] = useState([]);
  /* 查询菜单下拉树结构 */
  const getTreeselect = useCallback(async (params?: any) => {
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
  }, []);
  /** 修改按钮操作 */
  const handleUpdate = useCallback(
    (row: IResQueryMenuList) => {
      showModal({ modalInfo: row, menuOptions: treeData, tag: "update" }).then(
        () => {
          ref.current.reloadAndRest();
        }
      );
    },
    [JSON.stringify(treeData), ref.current]
  );

  /** 新增按钮操作 */
  const handleAdd = useCallback(
    async (row?: IResQueryMenuList) => {
      showModal({
        modalInfo: {
          parentId: (row && row.menuId) || 0,
          menuType: "M",
        },
        menuOptions: treeData,
        tag: "add",
      }).then(() => {
        ref.current.reloadAndRest();
      });
    },
    [JSON.stringify(treeData), ref.current]
  );

  const handleDelete = useCallback(
    async (row: IResQueryMenuList) => {
      Modal.confirm({
        title: '是否确认删除名称为"' + row.menuName + '"的数据项?',
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          delMenu(row.menuId)
            .then(() => {
              message.success("删除成功");
              ref.current.reloadAndRest();
            })
            .catch((e) => {
              message.error(e?.msg || "删除失败");
            });
        },
      });
    },
    [ref.current]
  );

  const { columns } = useColumns(
    handleUpdate,
    handleAdd,
    handleDelete,
    treeData,
    ref
  );
  return (
    <>
      <ProTable<IResQueryMenuList>
        tableClassName="page-content-min-height"
        actionRef={ref}
        columns={columns}
        rowKey={"menuId"}
        pagination={false}
        request={async (params: any, sort, fliter) => {
          const treeData = await getTreeselect(params);
          setTreeData(treeData);
          return {
            data: treeData,
            success: true,
          };
        }}
        search={{
          filterType: "light",
        }}
        onRequestError={(error) => {
          console.error(error);
        }}
        cardProps={{
          bodyStyle: { padding: "0 10px 10px 10px" },
        }}
        options={false}
        defaultSize="small"
        dateFormatter="string"
        toolBarRender={() => [
          <PermissionA
            size="small"
            type="primary"
            permissions={["system:menu:add"]}
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
