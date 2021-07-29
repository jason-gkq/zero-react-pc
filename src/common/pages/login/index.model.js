import { createModel } from "@/common/redux";
import { put, call, select } from "redux-saga/effects";
import { cookieStorage } from "@/common/cache";
import { httpsClient } from "@/common/net";

export default createModel({
  name: "login",
  state: {
    systemName: "小程序",
    pageStatus: "loading",
    url: "/index/index",
    params: {},
  },
  config: {
    pageId: "10011",
    title: "登录",
    isNeedLogin: false,
    isNeedPermission: false,
  },
  reducers: {},
  sagas: {
    *didMount({ $actions }, { payload }) {
      const { to = "", ...params } = payload;
      yield put(
        $actions.setState({
          pageStatus: "success",
          url: decodeURIComponent(to),
          params,
        })
      );
    },
    *requestSmsCode({ $selectors, $globalActions }) {
      try {
        // const user = yield httpsClient.post(`gateway/user/smsLogin`, {
        //   mobile: "13800000000",
        //   code: "1111",
        // });
        const user = yield call(
          httpsClient.post,
          "gateway/manage/common/api/user/pwdLogin",
          {
            loginName: "15000499260",
            passwd: "12345678",
          }
        );
        user["isLogin"] = false;
        if (user && user.user && user.user.mobile) {
          user["isLogin"] = true;
        }
        user["mobile"] = user.user && user.user.mobile;
        cookieStorage.setItem(
          "token",
          user.token,
          Infinity,
          "/",
          cookieStorage.getDomain()
        );
        yield put($globalActions.user.setUser(user));
        const { url = "/index/index", params } = yield select(
          $selectors.getState
        );
        yield put($globalActions.navigate.redirect({ url, payload: params }));
      } catch (error) {
        cookieStorage.removeItem("token", "", cookieStorage.getDomain());
        yield put($globalActions.user.setUser({ isLogin: false }));
      }
    },
  },
  // selectors: {},
});
