import { createModel } from "@/zero/redux";
// import { httpsClient } from "@/zero/net";
// import { storage, cookieStorage } from "@/zero/cache";
// import { put, call, select } from "redux-saga/effects";

const model = createModel({
  // model名称，view层用于提取state的key，需要保证唯一
  name: "app",
  isGlobal: true,
  // 初始state状态
  config: {
    title: "乐车邦",
    isNeedLogin: false,
    isNeedPermission: false,
  },
  state: {
    appStatus: "",
  },
  reducers: {},
  sagas: {
    *didMount(
      { $actions, $selectors, $globalActions, $globalSelectors },
      { payload: { done, ...option } }
    ) {
      /**
       * option 启动参数
       * done 不可删除
       */
      if (done) {
        done();
      }
    },
  },
});

export default model;
