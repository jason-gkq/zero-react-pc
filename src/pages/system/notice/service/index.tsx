import { HttpClient } from "@/zero/api";
import { 
  IResQueryNoticeList,
  IReqQueryNoticeList,
  IResGetNotice,
  IReqAddNotice,
  IResAddNotice,
  IReqUpdateNotice,
  IResUpdateNotice,
  IResDelNotice
 } from "./index.d";

export const queryNoticeList = async (
  payload?: IReqQueryNoticeList
): Promise<{ rows: IResQueryNoticeList[]; total: number }> => {
  const {
    rows,
    total,
  }: {
    rows: IResQueryNoticeList[];
    total: number;
  } = await HttpClient.get("system/notice/list", { params: payload });
  return { rows, total };
};

// 查询公告详细
const getNotice = async (noticeId: number[] | number): Promise<{ data: IResGetNotice['data'] }> => {
  const { data } = await HttpClient({
    url: '/system/notice/' + noticeId,
    method: 'get'
  })
  return { data }
}

// 新增公告
const addNotice = async (data: IReqAddNotice): Promise<IResAddNotice> => {
  return await HttpClient.post('system/notice', data);
}

// 修改公告
const updateNotice = async (data: IReqUpdateNotice): Promise<IResUpdateNotice> => {
  return await HttpClient.put('system/notice', data)
}
// 删除公告
const delNotice = async (noticeId: number | number[]): Promise<IResDelNotice> => {
  return await HttpClient.delete(`system/notice/${noticeId}`)
}

export {
  getNotice,
  addNotice,
  updateNotice,
  delNotice
}
