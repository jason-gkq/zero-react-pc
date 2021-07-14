import { createModel } from "@/common/redux";
import { put, call } from "redux-saga/effects";
import usaImg from "@/assets/img/usa.svg";
import chinaImg from "@/assets/img/china.svg";

const model = createModel({
  // model名称，view层用于提取state的key，需要保证唯一
  name: "app",
  isGlobal: true,
  // 初始state状态
  state: {
    isNeedLogin: false,
    isNeedPermission: false,
  },
  reducers: {},
  sagas: {
    *didMount({ $actions, $globalActions }) {
      //TODO 项目启动 = appOnLaunch
      // console.log("pages/home/index.model.js/saga/didMount");
      // yield put($globalActions.env.changeTheme({ theme: "A" }));
    },
  },
});

export default model;
