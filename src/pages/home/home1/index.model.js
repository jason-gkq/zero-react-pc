import { createModel } from "@/common/redux";
import { put, call } from "redux-saga/effects";

export default createModel({
  name: "Home",
  config: {
    pageId: "10011",
    title: "home1",
    isNeedLogin: false,
    isNeedPermission: false, // 如无权限，则无需配置
  },
  state: {
    systemName: "小程序",
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
    *didMount({ $actions }) {
      console.log("pages/home/index.model.js/saga/didMount");
      // yield put($actions.setState({ pageStatus: "234324" }));
    },
  },
  selectors: {},
});
