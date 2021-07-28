import { createModel } from "@/common/redux";

export default createModel({
  name: "Index",
  config: {
    pageId: "10011",
    title: "Index",
    isNeedLogin: false,
    isNeedPermission: false,
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
    *didMount() {
      // console.log("pages/index/index.model.js/saga/didMount");
    },
  },
  selector: {},
});
