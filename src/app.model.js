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
    isNeedLogin: false,
    isNeedPermission: false,
  },
  state: {
    appStatus: "",
  },
  reducers: {},
  sagas: {
    *didMount({ $actions }, { payload: { done } }) {
      // const { isNeedPermission, isNeedLogin } = yield select($selectors.getApp);
      // console.log(">>>>", isNeedPermission, isNeedLogin);
      //TODO 项目启动 = appOnLaunch
      // console.log("pages/home/index.model.js/saga/didMount");
      // yield put($globalActions.env.changeTheme({ theme: "A" }));
      // yield put($actions.queryUserAuth());
      if (done) {
        done();
      }
    },
  },
});

export default model;
