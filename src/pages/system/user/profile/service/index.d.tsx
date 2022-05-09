import { Models } from "../../../../../rapper/index";

export type IResGetUserProfile = Models['GET/system/user/profile']['Res'];

export type IResUpdateUserProfile = Models['PUT/system/user/profile']['Res'];
export type IReqUpdateUserProfile = Models['PUT/system/user/profile']['Req'];

export type IResUpdateUserPwd = Models['PUT/system/user/profile/updatePwd']['Res'];
export type IReqUpdateUserPwd = Models['PUT/system/user/profile/updatePwd']['Req'];

export type IResUploadAvatar = Models['POST/system/user/profile/avatar']['Res'];
export type IReqUploadAvatar = Models['POST/system/user/profile/avatar']['Req'];

export type IUserInfoForm = {
    nickName: string
    phonenumber: string
    email: string
    sex: string
}
export type IPwd = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
