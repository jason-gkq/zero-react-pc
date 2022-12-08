import { HttpClient } from "@/zero";
import {
  IReqQueryMenuList,
  IResQueryMenuList,
  IResGetMenu,
  IReqAddMenu,
  IReqUpdateMenu,
  IResAddMenu,
  IResDelMenu,
  IResUpdateMenu,
} from "./index.d";

// 查询菜单列表
export const queryMenuList = async (
  payload?: IReqQueryMenuList
): Promise<{ data: IResQueryMenuList[] }> => {
  const { data }: { data: IResQueryMenuList[] } = await HttpClient.get(
    "system/menu/list",
    {
      params: payload,
    }
  );
  return { data };
};

// 查询菜单详细
const getMenu = async (
  menuId: number
): Promise<{ data: IResGetMenu["data"] }> => {
  const { data } = await HttpClient.get("system/menu/" + menuId);
  return { data };
};

// 新增菜单
const addMenu = async (data: IReqAddMenu): Promise<IResAddMenu> => {
  return await HttpClient.post("system/menu", data);
};
// 修改菜单
const updateMenu = async (data: IReqUpdateMenu): Promise<IResUpdateMenu> => {
  return await HttpClient.put("system/menu", data);
};

// 删除菜单
const delMenu = async (menuId: number): Promise<IResDelMenu> => {
  return await HttpClient.delete("system/menu/" + menuId);
};

export { getMenu, addMenu, updateMenu, delMenu };
