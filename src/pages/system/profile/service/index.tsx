import { HttpClient } from "@/zero";

import { IResGetUserProfile } from "./index.d";

// 查询用户个人信息
export const getUserProfile = async (): Promise<IResGetUserProfile> => {
  return await HttpClient.get("system/user/profile");
};

// 修改密码
export const changePwd = async (payload: any): Promise<any> => {
  return await HttpClient.post("system/user/changePwd", payload);
};
