export type IReqQueryUserList = {
  pageNum?: number;
  pageSize?: number;
  beginTime?: string;
  endTime?: string;
  status?: string;
  phonenumber?: string;
  deptId?: number;
  userName?: string;
};

export type IRole = {
  searchValue?: string;
  createBy?: string;
  createTime?: string;
  updateBy?: string;
  updateTime?: string;
  remark?: string;
  dataScope?: string;
  params?: any;
  roleId: number;
  roleName: string;
  roleKey?: string;
  roleSort?: string;
  status: string;
  delFlag?: string;
  flag: boolean;
  menuIds: any;
  deptIds: any;
  admin: boolean;
};

export type IResQueryUserList = {
  admin: boolean;
  avatar?: any;
  createBy?: string;
  createTime: string;
  dataScope?: string;
  delFlag?: string;
  dept: any;
  deptId: string;
  email: string;
  loginDate?: string;
  loginIp?: string;
  nickName: string;
  params?: any;
  password?: string;
  phonenumber: string;
  postIds?: any;
  remark?: string;
  roleIds?: any;
  roles: IRole[];
  salt?: any;
  searchValue?: any;
  sex?: string;
  status: string;
  updateBy?: string;
  updateTime?: string;
  userId: number;
  userName: string;
};

export type IResGetUser = {
  data?: IResQueryUserList;
  postIds?: number[];
  posts: any;
  roleIds?: number[];
  roles: IRole[];
};
