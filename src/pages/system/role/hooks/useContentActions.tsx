import { useMemo } from 'react';
import { Modal, message } from 'antd';
import {
  menuTreeselect,
  roleMenuTreeselect,
  getRole,
  delRole,
} from '../service';

export default (ref: any, formRef: any, showRoleModal: any) => {
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

    /* 删除按钮操作 */
    const handleDelete = (roleId: number | number[]) => {
      Modal.confirm({
        title: '是否确认删除角色编号为"' + roleId + '"的数据项?',
        cancelText: '取消',
        okText: '确认',
        onOk: () => {
          delRole(roleId)
            .then(() => {
              message.success('删除成功');
              ref.current.reloadAndRest();
            })
            .catch((e) => {
              message.error(e?.msg || '删除失败');
            });
        },
      });
    };

    return {
      handleAdd,
      handleUpdate,
      handleDelete,
    };
  }, [ref, formRef, showRoleModal]);
};
