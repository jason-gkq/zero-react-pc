import { HttpClient } from "@/zero/api";
import {
  IReqQueryDepList,
  IResQueryDepList,
  IReqGetDept,
  IResGetDept,
  IReqAddDept,
  IResAddDept,
  IReqDelDept,
  IResDelDept,
  IReqUpdateDept,
  IResUpdateDept,
} from "./index.d";

// 查询部门列表
const queryDeptList = async (
  payload?: IReqQueryDepList
): Promise<{ data: IResQueryDepList[] }> => {
  const { data }: { data: IResQueryDepList[] } = await HttpClient.get(
    "system/dept/list",
    {
      params: payload,
    }
  );
  return { data };
};

// 查询部门详细
const getDept = async (
  deptId: number
): Promise<{ data: IResGetDept["data"] }> => {
  const { data } = await HttpClient({
    url: "/system/dept/" + deptId,
    method: "get",
  });
  return { data };
};

// 新增部门
const addDept = async (data: IReqAddDept): Promise<IResAddDept> => {
  return await HttpClient.post("system/dept", data);
};

// 修改部门
const updateDept = async (data: IReqUpdateDept): Promise<IResUpdateDept> => {
  return await HttpClient.put("system/dept", data);
};
// 删除部门
const delDept = async (deptId: number): Promise<IResDelDept> => {
  return await HttpClient.delete(`system/dept/${deptId}`);
};

export { delDept, updateDept, addDept, getDept, queryDeptList };
