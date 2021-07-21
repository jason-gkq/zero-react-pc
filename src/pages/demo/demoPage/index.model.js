import { createModel } from "@/common/redux";
import { put, call } from "redux-saga/effects";

export default createModel({
  name: "demo",
  config: {
    pageId: "10911",
    title: "DEMO",
    isNeedLogin: true,
    isNeedPermission: false, // 如无权限，则无需配置
  },
  state: {
    systemName: "DEMO",
  },
  reducers: {
    changeName(state, { payload }) {
      return {
        ...state,
        systemName: payload,
      };
    },
  },
  sagas: {
    *didMount(
      { $actions, $selectors, $globalActions, $globalSelectors },
      { payload }
    ) {
      console.log("pages/demo/index.model.js/saga/didMount");
    },
  },
  selectors: {},
});
