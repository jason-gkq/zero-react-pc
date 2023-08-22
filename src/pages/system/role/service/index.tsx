import { HttpClient } from '@/zero';
import {
  IReqQueryRoleList,
  IResQueryRoleList,
  IReqGetTreeselect,
  IResGetTreeselect,
  IResGetRole,
  IResGetDeptTreeSelect,
} from './index.d';
import { Models } from '@/src/rapper';

/* 查询角色列表 */
export const queryRoleList = async (
  payload?: IReqQueryRoleList
): Promise<{ rows: IResQueryRoleList[]; total: number }> => {
  const {
    rows,
    total,
  }: {
    rows: IResQueryRoleList[];
    total: number;
  } = await HttpClient.get('system/role/list', { params: payload });
  return { rows, total };
};

/*  查询菜单权限下拉树结构 */
export const menuTreeselect = async (
  payload?: IReqGetTreeselect
): Promise<{ data: IResGetTreeselect[] }> => {
  const {
    data,
  }: {
    data: IResGetTreeselect[];
  } = await HttpClient.get('system/menu/treeselect', { params: payload });
  return { data };
};

/* 新增角色 */
export const addRole = async (payload: IResQueryRoleList): Promise<any> => {
  return await HttpClient.post(`system/role`, payload);
};

/* 修改角色 */
export const updateRole = async (payload: IResQueryRoleList): Promise<any> => {
  return await HttpClient.put(`system/role`, payload);
};

/* 删除角色 */
export const delRole = async (roleId: number | number[]) => {
  return await HttpClient.delete(`system/role/${roleId}`);
};

// 根据角色ID查询菜单下拉树结构
export const roleMenuTreeselect = async (
  roleId: number | number[]
): Promise<{
  menus: Models['GET/system/menu/roleMenuTreeselect/:id']['Res']['menus'];
  checkedKeys: Models['GET/system/menu/roleMenuTreeselect/:id']['Res']['checkedKeys'];
}> => {
  const {
    menus,
    checkedKeys,
  }: {
    menus: Models['GET/system/menu/roleMenuTreeselect/:id']['Res']['menus'];
    checkedKeys: Models['GET/system/menu/roleMenuTreeselect/:id']['Res']['checkedKeys'];
  } = await HttpClient.get(`system/menu/roleMenuTreeselect/${roleId}`);
  return { menus, checkedKeys };
};

const getRole = async (roleId: number): Promise<{ data: IResGetRole }> => {
  return await HttpClient.get('system/role/' + roleId);
};

// 根据角色ID查询部门树结构
const roleDeptTreeselect = async (
  roleId: number
): Promise<{
  depts: IResGetDeptTreeSelect['depts'];
  checkedKeys: IResGetDeptTreeSelect['checkedKeys'];
}> => {
  return await HttpClient.get('system/dept/roleDeptTreeselect/' + roleId);
};

export { getRole, roleDeptTreeselect };
