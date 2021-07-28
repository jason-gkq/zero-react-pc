import { createModel } from "@/common/redux";
import { httpsClient } from "@/common/net";
import { put, select, call } from "redux-saga/effects";
import { createSelector } from "reselect";

export default createModel({
  /**
   * redex中model的名称，一定要保证全局唯一
   */
  name: "demo",
  /**
   * 页面配置，每个页面必须
   * pageId 页面唯一标识，必须经过leader或数据团队盛丽敏确认
   * title 页面标题
   * isNeedLogin true 需要登录| false 或没配置 则不需要登录 当前页面是否需要登录，如果没有配置则取 app.model.js 中配置
   * isNeedPermission true 需要权限| false 或没配置 则不需要权限 当前页面是否需要权限，如果没有配置则取 app.model.js 中配置
   */
  config: {
    pageId: "10911",
    title: "DEMO",
    isNeedLogin: true,
    isNeedPermission: false,
  },
  /**
   * 页面默认参数定义
   */
  state: {
    systemName: "DEMO",
    pageStatus: "loading",
    authData: {},
  },
  /**
   * 纯函数和sagas中方法不能重名
   */
  reducers: {
    changeName(state, { payload }) {
      return {
        ...state,
        systemName: payload,
      };
    },
  },
  /**
   * sagas中参数介绍：
   *  { $actions, $selectors, $globalActions, $globalSelectors }
   *    $actions 当前model中所有 action；内置 setState 方法操作当前 state
   *    $selectors 当前model中所有 selector；内置 getState 方法获取当前 state
   *    $globalActions 全局 action 目前包含 root和app.model.js
   *    $globalSelectors 全局 selector 目前包含 root和app.model.js
   *  { payload }
   *    如果是 didMount 则为页面入口参数
   *    如果非 didMount 则为调用函数的入参
   *  didMount 为页面render之后自动执行
   */
  sagas: {
    *didMount(
      { $actions, $selectors, $globalActions, $globalSelectors },
      { payload }
    ) {
      console.log("pages/demo/index.model.js/saga/didMount");
      // 页面加载完成修改页面状态
      yield put($actions.setState({ pageStatus: "success" }));
    },
    // 所有方法前必须加：*
    *getAuthData(
      { $actions, $selectors, $globalActions, $globalSelectors }, // 不需要的参数可以不用引入
      { payload }
    ) {
      // 接口调用示例
      const authData = yield call(httpsClient.post, { ...payload });
      // 存值如state
      yield put($actions.setState({ authData }));
      // 获取state
      const { authData: newAuthData1 } = yield select($selectors.getState);
      console.log("newAuthData:", newAuthData1);
      // 获取state
      const newAuthData2 = yield select($selectors.getAuthData);
      console.log("newAuthData:", newAuthData2);
    },
    *consoleUser({ $selectors }) {
      const user = yield select($selectors.getUser);
      console.log(user);
    },
  },
  selectors: {
    getAuthData(state) {
      const { authData } = state;
      return authData;
    },
    getUser: createSelector(
      (state) => state.authData,
      (result) => {
        const { user } = result || {};
        return user;
      }
    ),
  },
});
