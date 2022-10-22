import { Models } from "@/src/rapper";

export type IReqQueryConfigList = Models["GET/system/config/list"]["Req"];
export type IResQueryConfigList =
  Models["GET/system/config/list"]["Res"]["rows"][0];

export type IReqGetConfig = Models["GET/system/config/:configId"]["Req"];
export type IResGetConfig = Models["GET/system/config/:configId"]["Res"];

export type IReqAddConfig = Models["POST/system/config"]["Req"];
export type IResAddConfig = Models["POST/system/config"]["Res"];

export type IReqUpdateConfig = Models["PUT/system/config"]["Req"];
export type IResUpdateConfig = Models["PUT/system/config"]["Res"];

export type IReqDelConfig = Models["DELETE/system/config/:configId"]["Req"];
export type IResDelConfig = Models["DELETE/system/config/:configId"]["Res"];

export type IResGetConfigKey =
  Models["GET/system/config/configKey/:configKey"]["Res"];
