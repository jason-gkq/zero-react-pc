import { createModel, store } from "@/zero/redux";
import { put, call, select } from "redux-saga/effects";
import { cookieStorage } from "@/zero/api";

export default createModel({
  name: "login",
  state: {
    systemName: "小程序",
    pageStatus: "loading",
    url: "/index/index",
    params: {},

    loginTitle: "乐车邦员工管理后台",
    codeDesc: "发送验证码",
    codeDisabled: false,
    fDate: new Date().getFullYear(),

    isForgetPwd: false,
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
    *changeCodeBtn({ $actions }) {
      let num = 60;
      let timer = setInterval(() => {
        if (num > 0) {
          num = num - 1;
          store.dispatch(
            $actions.setState({
              codeDisabled: true,
              codeDesc: `发送中（${num}）`,
            })
          );
        } else {
          clearInterval(timer);
          store.dispatch(
            $actions.setState({
              codeDisabled: false,
              codeDesc: `重发验证码`,
            })
          );
        }
      }, 1000);
    },
    *getCode({ $actions, $selectors, $globalActions }, { payload }) {
      try {
        const result = yield call(
          Zero.post,
          "gateway/manage/common/api/user/sendSecurityFindPwdSms",
          {
            mobile: payload,
          }
        );
        yield put($actions.changeCodeBtn());
      } catch (err) {
        if (err.statusCode === "9135" || err.statusCode === "9136") {
        }
        console.warn(err);
      }
    },
    *requestSmsCode({ $selectors, $globalActions }, { payload }) {
      try {
        const user = yield call(
          Zero.post,
          "gateway/manage/common/api/user/pwdLogin",
          {
            ...payload,
            // loginName: "15000499260",
            // passwd: "12345678",
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
        yield put($globalActions.auth.queryAuth());
        yield put($globalActions.navigate.redirect({ url, payload: params }));
      } catch (error) {
        cookieStorage.removeItem("token", "/", cookieStorage.getDomain());
        yield put($globalActions.user.setUser({ isLogin: false }));
      }
    },
    *resetPwd({ $selectors, $globalActions }, { payload }) {
      try {
        const result = yield call(
          Zero.post,
          "gateway/manage/common/api/user/resetPwd",
          {
            ...payload,
          }
        );
        yield put(
          $globalActions.navigate.redirect({ url: "/backend/common/login" })
        );
      } catch (error) {
        console.warn("重置密码失败");
      }
    },
  },
  // selectors: {},
});
