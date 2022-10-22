import { Models } from "@/src/rapper";

export type IReqQueryNoticeList = Models["GET/system/notice/list"]["Req"];
export type IResQueryNoticeList =
  Models["GET/system/notice/list"]["Res"]["rows"][0];
