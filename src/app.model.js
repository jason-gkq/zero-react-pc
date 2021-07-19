import { createModel } from "@/common/redux";
// import { httpsClient } from "@/common/net";
// import { storage, cookieStorage } from "@/common/cache";
// import { put, call, select } from "redux-saga/effects";

const model = createModel({
  // model名称，view层用于提取state的key，需要保证唯一
  name: "app",
  isGlobal: true,
  // 初始state状态
  state: {},
  reducers: {},
  sagas: {
    *didMount({ $actions }) {
      // const { isNeedPermission, isNeedLogin } = yield select($selectors.getApp);
      // console.log(">>>>", isNeedPermission, isNeedLogin);
      //TODO 项目启动 = appOnLaunch
      // console.log("pages/home/index.model.js/saga/didMount");
      // yield put($globalActions.env.changeTheme({ theme: "A" }));
      // yield put($actions.queryUserAuth());
    },
  },
});

export default model;
