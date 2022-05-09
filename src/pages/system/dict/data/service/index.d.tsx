import { Models } from "../../../../../rapper/index";

export type IReqQueryDictList = {
  pageNum?: number;
  pageSize?: number;
  beginTime?: string;
  endTime?: string;
};

export type IResQueryDictList = Models['GET/system/dict/data/list']['Res']['rows'][0];

export type IReqGetDictData = Models['GET/system/dict/data/:dictCode']['Req']
export type IResGetDictData = Models['GET/system/dict/data/:dictCode']['Res']

export type IReqAddDictData = Models['POST/system/dict/data']['Req']
export type IResAddDictData = Models['POST/system/dict/data']['Res']

export type IReqUpdateDictData = Models['PUT/system/dict/data']['Req']
export type IResUpdateDictData = Models['PUT/system/dict/data']['Res']

export type IReqDelDictData = Models['DELETE/system/dict/data/:dictCode']['Req']
export type IResDelDictData = Models['DELETE/system/dict/data/:dictCode']['Res']

export type IReqExportDictData = Models['GET/system/dict/data/export']['Req']
export type IResExportDictData = Models['GET/system/dict/data/export']['Res']