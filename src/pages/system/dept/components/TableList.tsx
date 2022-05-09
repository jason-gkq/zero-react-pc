import React, { useState, useRef } from "react";
import ProTable from "@ant-design/pro-table";
import { Modal, message } from "antd";
import type { ActionType } from "@ant-design/pro-table";
import type { IResQueryDepList } from "../service/index.d";
import { arrayToTree } from "@/zero/utils";
import { PermissionButton, useNiceModal } from "@/zero/components";
import useColumns from "../hooks/useColumns";
import { MODAL_ID } from "./DeptModal";
import DeptModal from "../containers/DeptModal";
import { getDept, queryDeptList, delDept } from "../service";

export default () => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<number[]>([]);
  const [deptOptions, setDeptOptions] = useState();
  const { show: showModal } = useNiceModal(MODAL_ID);
  const ref = useRef<ActionType>();

  /** 查询部门下拉树结构 */
  const getTreeselect = async (params?: any) => {
    const { data } = await queryDeptList(params);
    const res = arrayToTree(data, "deptId", "parentId");

    const ids: number[] = [0];
    const deletEmpty = (data: any) => {
      for (let i = 0; i < data.length; i++) {
        ids.push(data[i]["deptId"]);
        if (data[i]["children"] && data[i]["children"].length > 0) {
          deletEmpty(data[i]["children"]);
        } else {
          Reflect.deleteProperty(data[i], "children");
        }
      }
      return data;
    };

    setDeptOptions(deletEmpty(res));
    setExpandedRowKeys(ids);

    return deletEmpty(res);
  };

  /** 新增按钮操作 */
  const handleAdd = async (deptId: number) => {
    const treeData = await getTreeselect();
    showModal({
      deptOptions: treeData,
      modalInfo: { parentId: String(deptId) },
    }).then(() => {
      (ref as any).current.reloadAndRest();
    });
  };

  /** 修改按钮操作 */
  const handleUpdate = async (deptId: number) => {
    const treeData = await getTreeselect();
    const { data } = await getDept(deptId);
    if (!data) return;
    showModal({
      deptOptions: treeData,
      modalInfo: Object.assign({}, data, {
        parentId: String(data.parentId),
      }),
    }).then(() => {
      (ref as any).current.reloadAndRest();
    });
  };

  /** 删除按钮操作 */
  const handleDelete = (deptName: string, deptId: number) => {
    Modal.confirm({
      title: '是否确认删除名称为"' + deptName + '"的数据项?',
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        delDept(deptId)
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

  /* 新增 */
  const onAdd = async (deptId?: number) => {
    showModal({
      deptOptions: deptOptions,
      modalInfo: { parentId: String(deptId) },
    }).then(() => {
      (ref as any).current.reloadAndRest();
    });
  };

  return (
    <>
      <ProTable<IResQueryDepList>
        actionRef={ref}
        columns={columns}
        rowKey={"deptId"}
        pagination={false}
        expandable={{
          defaultExpandAllRows: true,
          expandedRowKeys: expandedRowKeys,
          onExpand: (isExpand, record) => {
            if (isExpand) {
              setExpandedRowKeys([...expandedRowKeys, record.deptId]);
            } else {
              const newIds = expandedRowKeys.filter((i) => i != record.deptId);
              setExpandedRowKeys(newIds);
            }
          },
        }}
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
          <PermissionButton
            type='primary'
            size='small'
            permissions={["system:dept:add"]}
            onClick={() => onAdd(100)}
          >
            新增
          </PermissionButton>,
        ]}
      />
      <DeptModal />
    </>
  );
};
