import { Models } from "../../../../rapper/index";

export type IReqQueryNoticeList = Models['GET/system/notice/list']['Req']
export type IResQueryNoticeList = Models['GET/system/notice/list']['Res']['rows'][0]

export type IReqGetNotice = Models['GET/system/notice/:noticeId']['Req']
export type IResGetNotice = Models['GET/system/notice/:noticeId']['Res']

export type IReqAddNotice = Models['POST/system/notice']['Req']
export type IResAddNotice = Models['POST/system/notice']['Res']

export type IReqUpdateNotice = Models['PUT/system/notice']['Req']
export type IResUpdateNotice = Models['PUT/system/notice']['Res']

export type IReqDelNotice = Models['DELETE/system/notice/:noticeId']['Req']
export type IResDelNotice = Models['DELETE/system/notice/:noticeId']['Res']
