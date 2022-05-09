import { HttpClient } from "@/zero/api";
import {
  IReqQueryDictList,
  IResQueryDictList,
  IReqAddDictData,
  IReqDelDictData,
  IReqExportDictData,
  IReqGetDictData,
  IReqUpdateDictData,
  IResAddDictData,
  IResDelDictData,
  IResExportDictData,
  IResGetDictData,
  IResUpdateDictData,
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
  } = await HttpClient.get("system/dict/data/list", { params: payload });
  return { rows, total };
};

// 查询字典类型详细
const getDictData = async (
  dictCode: number
): Promise<{ data: IResGetDictData["data"] }> => {
  const { data } = await HttpClient.get("system/dict/data/" + dictCode);
  return { data };
};

// 新增字典类型
const addDictData = async (data: IReqAddDictData): Promise<IResAddDictData> => {
  return await HttpClient.post("system/dict/data", data);
};
// 修改字典类型
const updateDictData = async (
  data: IReqUpdateDictData
): Promise<IResUpdateDictData> => {
  return await HttpClient.put("system/dict/data", data);
};

// 删除字典类型
const delDictData = async (dictCode: string): Promise<IResDelDictData> => {
  return await HttpClient.delete("system/dict/data/" + dictCode);
};

// 导出字典类型
const exportDictData = async (
  query: IReqExportDictData
): Promise<IResDelDictData> => {
  return await HttpClient.delete("system/dict/data/export", query);
};

export {
  delDictData,
  getDictData,
  addDictData,
  updateDictData,
  exportDictData,
};
