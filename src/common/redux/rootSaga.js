/**
 * takeEvery 多个实例同时启动
 * takeLatest 只执行这个任务是最后被启动的那个，之前的这个任务会被自动取消
 * put
 * call  call 同样支持调用对象方法，你可以使用以下形式，为调用的函数提供一个 this 上下文
 *    yield call([obj, obj.method], arg1, arg2, ...) // 如同 obj.method(arg1, arg2 ...)
 * apply 提供了另外一种调用的方式
 *    yield apply(obj, obj.method, [arg1, arg2, ...])
 * cps 表示的是延续传递风格
 *    const content = yield cps(readFile, '/path/to/file')
 * all 自动执行
 */
import {
  all,
  put,
  fork,
  call,
  select,
  takeLatest,
  takeEvery,
} from "redux-saga/effects";
import platform from "platform";

import staticActions from "./rootAction";
import { getEnv } from "./rootSelector";

import { cookieStorage, storage } from "../cache";
import { guid } from "../utils";

import { navigate } from "../navigate";

import { setCommonData, setAxiosBase, httpsClient } from "../net";

import {
  themes,
  injectTheme,
  setThemeContext,
  currentTheme,
} from "../core/themeContext";

const initEnv = function* () {
  const env = yield select(getEnv);
  let clientId = storage.getStorageSync("__clientId");
  if (!clientId) {
    clientId = guid();
    storage.setStorageSync("__clientId", clientId, Infinity);
  }
  // console.log(document.documentElement.style);
  const parentSessionId = guid();
  const sessionId = parentSessionId;
  const onLunchTime = Date.now();

  Object.assign(
    env,
    {
      parentSessionId,
      sessionId,
      onLunchTime,
      __clientId: clientId,
      version: process.env.VERSION,
      platformType: process.env.application,
      theme: "A",
    },
    process.env.productConfig
  );
  /**
   * 设置axios拦截器
   */
  setAxiosBase(env);
  yield call(changeTheme, { payload: { theme: env.theme } });
  yield put(staticActions.env.setEnv({ ...env }));
};

const injectThemes = function* ({ payload: { themes } }) {
  injectTheme(themes);
};

const changeTheme = function* ({ payload: { theme } }) {
  // const {theme} = yield select(getEnv);
  if (!themes[theme]) {
    return;
  }
  if (theme === currentTheme) {
    return;
  }
  setThemeContext(theme);
  const themeInfo = themes[theme];
  Object.keys(themeInfo).forEach((key) => {
    document.documentElement.style.setProperty(key, themeInfo[key]);
  });
  yield put(staticActions.env.setEnv({ theme }));
};

const setAppCode = function* ({ payload: { appCode } }) {
  setCommonData({ appCode });
  yield put(staticActions.env.setEnv({ appCode }));
};

const setServiceUrl = function* ({ payload: { SERVICE_URL } }) {
  setCommonData({ SERVICE_URL });
  yield put(staticActions.env.setEnv({ SERVICE_URL }));
};

const initSystem = function* () {
  const processEnv = process.env;
  const {
    document: documentInfo,
    navigator: navigatorInfo,
    location: locationInfo,
    screen: screenInfo,
    innerHeight,
    innerWidth,
    outerHeight,
    outerWidth,
    screenTop,
    screenLeft,
  } = window;
  const platformInfo = platform.parse(navigatorInfo.userAgent);
  let system = {
    author: processEnv.author,
    platform: platformInfo.name,
    winWidth: innerWidth || documentInfo.body.clientWidth,
    winHeight: innerHeight || screenInfo.availHeight,
    /**
     * 根据运行环境解析出来的 platform 信息
     */
    onLunchPlatform: platformInfo,
    /**
     * 项目打包编译信息
     */
    onLunchPackage: {
      projectName: processEnv.npm_package_name || "",
      babelEnv: processEnv.BABEL_ENV,
      nodeEnv: processEnv.NODE_ENV,
      lang: processEnv.LANG,
      launchInstanceID: processEnv.LaunchInstanceID,
      version: processEnv.npm_package_version,
      lifecycleEvent: processEnv.npm_lifecycle_event,
      lifeycleScript: processEnv.npm_lifecycle_script,
      projectMain: processEnv.npm_package_main,
      projectType: processEnv.npm_package_type,
      publicUrlOrPath: processEnv.publicUrlOrPath,
    },
    /**
     * 项目启动时location信息
     */
    onLunchLocation: {
      hash: locationInfo.hash,
      host: locationInfo.host,
      hostname: locationInfo.hostname,
      href: locationInfo.href,
      origin: locationInfo.origin,
      pathname: locationInfo.pathname,
      port: locationInfo.port,
      protocol: locationInfo.protocol,
      search: locationInfo.search,
    },
    /**
     * 计算项目启动时所有宽高以及屏幕信息
     */
    onLunchScreen: {
      innerHeight, // 屏幕可用工作区高度
      innerWidth, // 屏幕可用工作区宽度
      outerHeight, // 屏幕高
      outerWidth, // 屏幕宽
      clientWidth: documentInfo.body.clientWidth, // 网页可见区域宽
      clientHeight: documentInfo.body.clientHeight, // 网页可见区域高
      offsetWidth: documentInfo.body.offsetWidth, // 网页可见区域宽 (包括边线和滚动条的宽)
      offsetHeight: documentInfo.body.offsetHeight, // 网页可见区域高 (包括边线的宽)
      scrollWidth: documentInfo.body.scrollWidth, // 网页正文全文宽
      scrollHeight: documentInfo.body.scrollHeight, // 网页正文全文高
      // scrollTop:
      //   documentInfo.body.scrollTop || document.documentElement.scrollTop, // .body.scrollTop 网页被卷去的高(ff) || documentElement.scrollTop网页被卷去的高(ie)
      // scrollLeft: documentInfo.body.scrollLeft, // 网页被卷去的左
      screenTop, // 网页正文部分上
      screenLeft, // 网页正文部分左
      height: screenInfo.height, // 屏幕分辨率的高
      width: screenInfo.width, // 屏幕分辨率的宽
      availHeight: screenInfo.availHeight, // 屏幕可用工作区高度
      availWidth: screenInfo.availWidth, // 屏幕可用工作区宽度
      colorDepth: screenInfo.colorDepth, // 屏幕设置的位彩色
      pixelDepth: screenInfo.pixelDepth, // 屏幕设置的像素/英寸
    },
    /**
     * 项目运行环境信息
     */
    onLunchNavigator: {
      onLine: navigatorInfo.onLine,
      appCodeName: navigatorInfo.appCodeName,
      appName: navigatorInfo.appName,
      appVersion: navigatorInfo.appVersion,
      connection: navigatorInfo.connection,
      cookieEnabled: navigatorInfo.cookieEnabled,
      language: navigatorInfo.language,
      platform: navigatorInfo.platform,
      userAgent: navigatorInfo.userAgent,
      vendor: navigatorInfo.vendor,
    },
  };
  yield put(staticActions.system.setSystem(system));
};

// navigate
const goTo = function* ({ payload: { url, params = {}, options = {} } }) {
  navigate.goTo({ url, params, options });
  return;
};

const goBack = function* ({ payload: { delta, url = "" } = {} }) {
  navigate.goBack({ delta, url });
  return;
};

const redirect = function* ({ payload: { url, params = {}, options = {} } }) {
  navigate.redirect({ url, params, options });
  return;
};

const reLaunch = function* ({ payload: { url, params = {}, options = {} } }) {
  navigate.redirect({ url, params, options });
  return;
};

const login = function* ({ payload }) {
  try {
    const user = yield httpsClient.post(`gateway/user/smsLogin`, {
      mobile: "13800000000",
      code: "1111",
    });
    user["isLogin"] = true;
    user["mobile"] = user.user && user.user.mobile;
    yield put(staticActions.user.setUser(user));
  } catch (error) {
    yield put(staticActions.user.setUser({ isLogin: false }));
  }
};

const loginSuccess = function* ({ payload }) {};

const logout = function* ({ payload }) {};

const checkLogin = function* () {
  try {
    const { isNeedPermission } = yield select(getEnv);
    if (!isNeedPermission) {
      const user = yield httpsClient.post(`gateway/user/currentUser`);
      user["isLogin"] = false;
      if (user && user.user && user.user.mobile) {
        user["isLogin"] = true;
      }
      user["mobile"] = user.user && user.user.mobile;
      yield put(staticActions.user.setUser(user));
    } else {
      const {
        factoryInfoRespList,
        groupInfo,
        groupInfoResp,
        menus,
        roles,
        routerRules,
        user,
      } = yield httpsClient.post(
        `gateway/manage/common/api/auth/queryUserAuth`
      );
      user["isLogin"] = false;
      if (user && user.user && user.user.mobile) {
        user["isLogin"] = true;
      }
      user["mobile"] = user.user && user.user.mobile;

      yield put(
        staticActions.route.setRoute({
          menus,
        })
      );
      yield put(
        staticActions.shop.setShop({
          shopList: roles,
          shopInfo: groupInfo,
          groupInfoResp,
          factoryInfoRespList,
        })
      );
      yield put(staticActions.user.setUser(user));
    }
    yield put(staticActions.env.setEnv({ status: true }));
  } catch (error) {
    yield put(staticActions.user.setUser({ isLogin: false }));
    yield put(staticActions.env.setEnv({ status: true }));
  }
};

export default function* staticSagas() {
  /**
   * 系统信息初始化
   */
  yield all([initSystem(), initEnv()]);
  yield all([checkLogin()]);

  yield takeLatest(staticActions.env.changeTheme, changeTheme);
  yield takeLatest(staticActions.env.injectThemes, injectThemes);
  yield takeLatest(staticActions.env.setAppCode, setAppCode);
  yield takeLatest(staticActions.env.setServiceUrl, setServiceUrl);
  /**
   * 路由
   */
  yield takeLatest(staticActions.navigate.goTo, goTo);
  yield takeLatest(staticActions.navigate.goBack, goBack);
  yield takeLatest(staticActions.navigate.redirect, redirect);
  yield takeLatest(staticActions.navigate.reLaunch, reLaunch);
  /**
   * 用户
   */
  yield takeLatest(staticActions.user.login, login);
  yield takeLatest(staticActions.user.logout, logout);
}

// 用于缓存所有effects函数
// const rootSagas = [];
// // 对每个model进行操作-处理对应的effects
// for (let key in sagas) {
//   const watch = function* () {
//     yield takeLatest(key, function* (obj) {
//       // 第二个参数只传递了最常用的call,put进去，
//       // 如果想用更多其他'redux-saga/effects'的API，可在各自model中自行引入
//       try {
//         yield sagas[key](obj, { call, put });
//       } catch (e) {
//         // 统一处理effects抛出的错误
//       }
//     });
//   };
//   rootSagas.push(watch());
// }
