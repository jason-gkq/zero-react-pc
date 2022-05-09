import { Models } from "../../../rapper/index";

export type IReqQueryNoticeList = Models["GET/system/notice/list"]["Req"];
export type IResQueryNoticeList =
  Models["GET/system/notice/list"]["Res"]["rows"][0];
