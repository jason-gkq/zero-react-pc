import { Models } from "../../../../rapper/index";

export type IReqQueryDepList = {
  deptName?: string;
  status?: number;
};

export type IResQueryDepList = {
  createBy?: string;
  createTime?: string;
  dataScope?: string;
  params?: any;
  remark?: string;
  searchValue?: string;
  updateBy?: string;
  updateTime?: string;
  parentName?: any;
  parentId: number;
  orderNum: string;
  children: IResQueryDepList[];
  ancestors: string;
  delFlag: string;
  deptId: number;
  deptName: string;
  email: string;
  leader: string;
  phone: string;
  status: string;
};

export type IReqQueryDeptList = Models['GET/system/dept/list']['Req']
export type IResQueryDeptList = Models['GET/system/dept/list']['Res']['data']

export type IReqGetDept = Models['GET/system/dept/:deptId']['Req']
export type IResGetDept = Models['GET/system/dept/:deptId']['Res']

export type IReqAddDept = Models['POST/system/dept']['Req']
export type IResAddDept = Models['POST/system/dept']['Res']

export type IReqUpdateDept = Models['PUT/system/dept']['Req']
export type IResUpdateDept = Models['PUT/system/dept']['Res']

export type IReqDelDept = Models['DELETE/system/dept/:deptId']['Req']
export type IResDelDept = Models['DELETE/system/dept/:deptId']['Res']

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