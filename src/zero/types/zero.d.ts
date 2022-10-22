export { MenuDataItem } from "@ant-design/pro-components";

export interface IConfig {
  isNeedLogin?: boolean;
}

/**
 * 注册页面配置
 */
export interface IPageConfig extends IConfig {
  pageId: string;
  permissions?: string[];
}

/**
 * model配置契约
 */
export interface IModel {
  namespace: string;
  initialize: boolean;
  selectors: any;
  actions: any;
  reducers: any;
  _sagaTask: any;
  removeReducer?: Function;
  runSaga: Function;
  cancelSaga: Function;
}

/**
 * 入口页面props中内置参数
 */
export type IProps = {
  $dispatch: Function;
  $globalActions: any;
  $globalSelectors: any;
  $hasError?: number;
  $model?: any;
  $payload?: any;
  $route: string;
  [key: string]: any;
};

/**
 * 接口返回
 */
export interface IRes {
  code: number;
  msg?: string;
  desc?: string;
}

/**
 * model中saga方法内置第一个对象中包含的参数
 */
export type ISagas = {
  $actions: any;
  $selectors: any;
  $globalActions: any;
  $globalSelectors: any;
};
