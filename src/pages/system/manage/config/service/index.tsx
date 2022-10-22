import { HttpClient } from "@/zero/api";
import {
  IResQueryConfigList,
  IReqQueryConfigList,
  IResGetConfig,
  IReqAddConfig,
  IResAddConfig,
  IReqUpdateConfig,
  IResUpdateConfig,
  IResDelConfig,
  IResGetConfigKey,
} from "./index.d";

// 查询参数列表
export const queryConfigList = async (
  payload?: IReqQueryConfigList
): Promise<{ rows: IResQueryConfigList[]; total: number }> => {
  const {
    rows,
    total,
  }: {
    rows: IResQueryConfigList[];
    total: number;
  } = await HttpClient.get("system/config/list", { params: payload });
  return { rows, total };
};

// 查询参数详细
const getConfig = async (
  configId: number[] | number
): Promise<{ data: IResGetConfig["data"] }> => {
  const { data } = await HttpClient({
    url: "system/config/" + configId,
    method: "get",
  });
  return { data };
};

// 新增参数
const addConfig = async (data: IReqAddConfig): Promise<IResAddConfig> => {
  return await HttpClient.post("system/config", data);
};

// 修改参数
const updateConfig = async (
  data: IReqUpdateConfig
): Promise<IResUpdateConfig> => {
  return await HttpClient.put("system/config", data);
};
// 删除参数
const delConfig = async (
  configId: number | number[]
): Promise<IResDelConfig> => {
  return await HttpClient.delete(`system/config/${configId}`);
};

// 根据参数键名查询参数值
const getConfigKey = async (configKey: string): Promise<IResGetConfigKey> => {
  return await HttpClient.get(`system/config/configKey/${configKey}`);
};

export { getConfig, addConfig, updateConfig, delConfig, getConfigKey };
