import { HttpClient } from "@/zero/api";
import {
  IReqQueryDictList,
  IResQueryDictList,
  IReqAddType,
  IReqExportType,
  IReqUpdateType,
  IResAddType,
  IResDelType,
  IResGetType,
  IResUpdateType,
} from "./index.d";

export const queryDictList = async (
  payload?: IReqQueryDictList
): Promise<{ rows: IResQueryDictList[]; total: number }> => {
  const {
    rows,
    total,
  }: {
    rows: IResQueryDictList[];
    total: number;
  } = await HttpClient.get("system/dict/type/list", { params: payload });
  return { rows, total };
};

// 查询字典类型详细
const getType = async (
  dictId: number
): Promise<{ data: IResGetType["data"] }> => {
  const { data } = await HttpClient.get("system/dict/type/" + dictId);
  return { data };
};

// 新增字典类型
const addType = async (data: IReqAddType): Promise<IResAddType> => {
  return await HttpClient.post("system/dict/type", data);
};
// 修改字典类型
const updateType = async (data: IReqUpdateType): Promise<IResUpdateType> => {
  return await HttpClient.put("system/dict/type", data);
};

// 删除字典类型
const delType = async (dictId: number | number[]): Promise<IResDelType> => {
  return await HttpClient.delete("system/dict/type/" + dictId);
};

// 导出字典类型
const exportType = async (payload: IReqExportType): Promise<IResDelType> => {
  return await HttpClient.get("system/dict/type/export", { params: payload });
};

export { delType, getType, addType, updateType, exportType };
