import { Models } from "../../../../rapper/index";

export type IReqQueryDictList = {
  pageNum?: number;
  pageSize?: number;
  beginTime?: string;
  endTime?: string;
};

export type IResQueryDictList =
  Models["GET/system/dict/type/list"]["Res"]["rows"][0];

export type IReqGetType = Models["GET/system/dict/type/:id"]["Req"];
export type IResGetType = Models["GET/system/dict/type/:id"]["Res"];

export type IReqAddType = Models["POST/system/dict/type"]["Req"];
export type IResAddType = Models["POST/system/dict/type"]["Res"];

export type IReqUpdateType = Models["PUT/system/dict/type"]["Req"];
export type IResUpdateType = Models["PUT/system/dict/type"]["Res"];

export type IReqDelType = Models["DELETE/system/dict/type/:dictId"]["Req"];
export type IResDelType = Models["DELETE/system/dict/type/:dictId"]["Res"];

export type IReqExportType = Models["GET/system/dict/type/export"]["Req"];
export type IResExportType = Models["GET/system/dict/type/export"]["Res"];
