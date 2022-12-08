import { HttpClient } from "@/zero";

type IRes = any;
import {
  IReqQueryUserList,
  IResQueryUserList,
  IReqGetTreeselect,
  IResGetTreeselect,
  IResGetUser,
} from "./index.d";

export const queryUserList = async (
  payload?: IReqQueryUserList
): Promise<{ rows: IResQueryUserList[]; total: number }> => {
  const {
    rows,
    total,
  }: {
    rows: IResQueryUserList[];
    total: number;
  } = await HttpClient.get("system/user/list", { params: payload });
  return { rows, total };
};

export const getTreeselect = async (
  payload?: IReqGetTreeselect
): Promise<{ data: IResGetTreeselect[] }> => {
  const {
    data,
  }: {
    data: IResGetTreeselect[];
  } = await HttpClient.get("system/dept/treeselect", { params: payload });
  return { data };
};

export const getUser = async (
  payload?: number | string
): Promise<IResGetUser> => {
  return await HttpClient.get(`system/user/${payload}`);
};

export const addUser = async (payload: IResQueryUserList): Promise<IRes> => {
  return await HttpClient.post(`system/user`, payload);
};

export const updateUser = async (payload: IResQueryUserList): Promise<IRes> => {
  return await HttpClient.put(`system/user`, payload);
};

export const changeStatus = async (payload: {
  userId: number;
  status: string;
}): Promise<IRes> => {
  return await HttpClient.put(`system/user/changeStatus`, payload);
};

export const delUser = async (payload: string): Promise<IRes> => {
  return await HttpClient.delete(`system/user/${payload}`);
};

export const exportUser = async (payload: IReqQueryUserList): Promise<IRes> => {
  return await HttpClient.get(`system/user/export`, { params: payload });
};

export const importTemplate = async (): Promise<IRes> => {
  return await HttpClient.get(`system/user/importTemplate`);
};

export const getConfigKey = async (payload: string): Promise<IRes> => {
  return await HttpClient.get(`system/config/configKey/${payload}`);
};
