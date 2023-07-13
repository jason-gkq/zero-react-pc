import { HttpClient } from '@/zero';

type IRes = any;
import { IReqQueryUserList, IResQueryUserList, IResGetUser } from './index.d';

export const queryUserList = async (
  payload?: IReqQueryUserList
): Promise<{ rows: IResQueryUserList[]; total: number }> => {
  const {
    rows,
    total,
  }: {
    rows: IResQueryUserList[];
    total: number;
  } = await HttpClient.get('system/user/list', { params: payload });
  return { rows, total };
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

export const delUser = async (payload: string): Promise<IRes> => {
  return await HttpClient.delete(`system/user/${payload}`);
};
