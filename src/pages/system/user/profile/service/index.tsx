import { HttpClient } from "@/zero/api";

import {
  IResGetUserProfile,
  IReqUpdateUserProfile,
  IReqUploadAvatar,
  IResUpdateUserProfile,
  IResUpdateUserPwd,
  IResUploadAvatar,
} from "./index.d";

// 查询用户个人信息
const getUserProfile = async (): Promise<IResGetUserProfile> => {
  return await HttpClient.get("system/user/profile");
};

// 修改用户个人信息
const updateUserProfile = async (
  data: IReqUpdateUserProfile
): Promise<IResUpdateUserProfile> => {
  return await HttpClient.put("system/user/profile", data);
};

// 用户密码重置
const updateUserPwd = async (
  oldPassword: string,
  newPassword: string
): Promise<IResUpdateUserPwd> => {
  const data = {
    oldPassword,
    newPassword,
  };
  return await HttpClient.put("/system/user/profile/updatePwd", data);
};
// 用户头像上传
const uploadAvatar = async (
  data: IReqUploadAvatar
): Promise<IResUploadAvatar> => {
  return HttpClient.post("/system/user/profile/avatar", data);
};

export { getUserProfile, updateUserProfile, updateUserPwd, uploadAvatar };
