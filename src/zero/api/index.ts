/**
 * 缓存相关api
 */
export { default as cookieStorage } from "./cache/cookieStorage";
export { default as localStorage } from "./cache/localStorage";
export { default as sessionStorage } from "./cache/sessionStorage";
/**
 * 路由跳转
 */
export { navigate } from "./navigate";

/**
 * hooks 通用hooks封装 ------------------ BEGIN ----------------------
 */
/**
 * 项目配置信息
 */
export { useEnv } from "./hooks/useEnv";
/**
 * 项目打包相关信息
 */
export { useSystem } from "./hooks/useSystem";
/**
 * redux
 */
export { useAppDispatch } from "./hooks/useAppDispatch";
export { useAppSelector } from "./hooks/useAppSelector";
/**
 * 弹窗
 */
export { useSingleton } from "./hooks/useSingleton";
export { useMergeState } from "./hooks/useMergeState";

export { default as useSelectEnum } from "./hooks/useSelectEnum";
export type { IUseSelectEnum } from "./hooks/useSelectEnum";
/**
 * hooks 通用hooks封装 ------------------ END ----------------------
 */

/**
 * 网络请求
 */
export { HttpClient, net } from "./net/netAxios";
