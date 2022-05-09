import { Models } from "../../../../rapper/index";

export type IReqQueryMenuList = {
  menuName?: string;
  visible?: number;
};

export type IMenuTreeData = {
  key: number;
  value: number;
  title: string;
  parentIds: number[];
  children?: IMenuTreeData[];
};

export type IResQueryMenuList = Models['GET/system/menu/list']['Res']['data'][0]

export type IReqGetMenu = Models['GET/system/menu/:menuId']['Req']
export type IResGetMenu = Models['GET/system/menu/:menuId']['Res']

export type IReqAddMenu = Models['POST/system/menu']['Req']
export type IResAddMenu = Models['POST/system/menu']['Res']

export type IReqUpdateMenu = Models['PUT/system/menu']['Req']
export type IResUpdateMenu = Models['PUT/system/menu']['Res']

export type IReqDelMenu = Models['DELETE/system/menu/:menuId']['Req']
export type IResDelMenu = Models['DELETE/system/menu/:menuId']['Res']
