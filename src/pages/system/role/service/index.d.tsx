import { Models } from '../../../../rapper/index';

export type IReqQueryRoleList = {
  pageNum?: number;
  pageSize?: number;
  beginTime?: string;
  endTime?: string;
};

export type IResQueryRoleList =
  Models['GET/system/role/list']['Res']['rows'][0];

export type IReqGetTreeselect = {};

export type IResGetTreeselect = {
  label: string;
  id: number;
  children?: IResGetTreeselect[];
};

export type IMenuTreeList = {
  key: number;
  title: string;
  parentIds: number[];
};

export type IMenuTreeData = {
  key: number;
  value: number;
  title: string;
  parentIds: number[];
  children?: IMenuTreeData[];
};

export type IResGetRole = Models['GET/system/role/:roleId']['Res']['data'];

export type IDeptTreeList = {
  key: number;
  title: string;
  parentIds: number[];
};

export type IDeptTreeData = {
  key: number;
  value: number;
  title: string;
  parentIds: number[];
  children?: IDeptTreeData[];
};

export type IResGetDeptTreeSelect =
  Models['GET/system/dept/roleDeptTreeselect/:roleId']['Res'];
