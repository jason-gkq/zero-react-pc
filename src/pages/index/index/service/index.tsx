import { HttpClient } from "@/zero";
import { IResQueryNoticeList, IReqQueryNoticeList } from "./index.d";

// 查询公告列表
const listNotice = async (
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

export { listNotice };
