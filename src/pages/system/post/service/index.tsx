import { HttpClient as request } from "@/zero/api";

import {
  IReqQueryPostList,
  IResQueryPostList,
  IReqGetPost,
  IResGetPost,
  IReqAddPost,
  IResAddPost,
  IReqUpdatePost,
  IResUpdatePost,
  IReqDelPost,
  IResDelPost,
  IReqExportPost,
  IResExportPost,
  IQueryParams
} from "./index.d";

// 查询岗位列表
export const queryPostList = async (
  payload?: IReqQueryPostList
): Promise<{ rows: IResQueryPostList[]; total: number }> => {
  const {
    rows,
    total,
  }: {
    rows: IResQueryPostList[];
    total: number;
  } = await request.get("system/post/list", { params: payload });
  return { rows, total };
};

// 查询岗位详细
export async function getPost(postId: number): Promise<{ data: IResGetPost['data'] }> {
  const data = await request({
    url: '/system/post/' + postId,
    method: 'get'
  })
  return data
}

// 新增岗位
export const addPost = async (data: IReqAddPost): Promise<IResAddPost> => {
  return await request.post('system/post', data)
}

// 修改岗位
export const updatePost = async (data: IReqUpdatePost): Promise<IResUpdatePost> => {
  return await request.put('system/post', data)
}


// 删除角色
export const delPost = async (postId: number | number[]): Promise<IResDelPost> => {
  return await request.delete('/system/post/' + postId)
}

// 导出岗位
export const exportPost = async (query: IReqExportPost): Promise<IResExportPost> => {
  return await request.get('system/post/export', query)
}