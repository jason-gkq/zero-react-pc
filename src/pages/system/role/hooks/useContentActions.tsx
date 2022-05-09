import React, { useMemo } from "react";
import { Modal, message } from "antd";
import {
  menuTreeselect,
  roleMenuTreeselect,
  getRole,
  exportRole,
  delRole,
  changeRoleStatus,
  roleDeptTreeselect,
} from "../service";
import { useDownload } from "@/common/hooks";
import type { IResQueryRoleList } from "../service/index.d";

export default (
  ref: any,
  formRef: any,
  showRoleModal: any,
  showRoleDataModal: any
) => {
  return useMemo(() => {
    /* 新增按钮操作  */
    const handleAdd = async () => {
      const { data } = await menuTreeselect();
      showRoleModal({ menuOptions: data }).then(() => {
        ref.current.reloadAndRest();
      });
    };

    /* 修改按钮操作 */
    const handleUpdate = async (roleId: number) => {
      const { menus, checkedKeys } = await roleMenuTreeselect(roleId);
      const { data } = await getRole(roleId);
      showRoleModal({
        modalInfo: data,
        menuOptions: menus,
        menuCheckedKeys: checkedKeys,
      }).then(() => {
        ref.current.reloadAndRest();
      });
    };

    /* 导出按钮操作 */
    const handleExport = () => {
      Modal.confirm({
        title: `是否确认导出所有角色数据项?`,
        cancelText: "取消",
        okText: "确认",
        onOk: () => {
          exportRole(formRef.current?.getFieldsValue())
            .then((response) => {
              response.msg
                ? useDownload(response.msg)
                : message.error("文件获取失败失败");
            })
            .catch((e) => {
              message.error(e?.msg || "文件获取失败失败");
            });
        },
      });
    };

    /* 删除按钮操作 */
    const handleDelete = (roleId: number | number[]) => {
      Modal.confirm({
        title: '是否确认删除角色编号为"' + roleId + '"的数据项?',
        cancelText: "取消",
        okText: "确认",
        onOk: () => {
          delRole(roleId)
            .then(() => {
              message.success("删除成功");
              ref.current.reloadAndRest();
            })
            .catch((e) => {
              message.error(e?.msg || "删除失败");
            });
        },
      });
    };

    /* 分配数据权限操作 */
    const handleDataScope = async (record: IResQueryRoleList) => {
      const { depts, checkedKeys } = await roleDeptTreeselect(record.roleId);
      const { data } = await getRole(record.roleId);
      showRoleDataModal({
        modalInfo: data,
        deptOptions: depts,
        deptCheckedKeys: checkedKeys,
      }).then(() => {
        ref.current.reloadAndRest();
      });
    };

    const changeUserStatus = (record: IResQueryRoleList, status: boolean) => {
      Modal.confirm({
        title: `确定要${status ? "启用" : "停用"}${record.roleName}角色吗？`,
        cancelText: "取消",
        okText: "确认",
        onOk: () => {
          changeRoleStatus({
            roleId: record.roleId,
            status: status ? "0" : "1",
          })
            .then(() => {
              message.success("操作成功");
              ref.current.reload();
            })
            .catch((e) => {
              message.error(e?.msg || "操作失败");
            });
        },
      });
    };

    return {
      handleAdd,
      handleUpdate,
      handleExport,
      handleDelete,
      handleDataScope,
      changeUserStatus,
    };
  }, [ref, formRef, showRoleModal, showRoleDataModal]);
};
