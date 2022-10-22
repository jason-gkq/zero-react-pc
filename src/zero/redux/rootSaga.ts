/**
 * takeEvery 多个实例同时启动
 * takeLatest 只执行这个任务是最后被启动的那个，之前的这个任务会被自动取消
 * take fork
 * Effect
 * put
 * call  call 同样支持调用对象方法，你可以使用以下形式，为调用的函数提供一个 this 上下文
 *    yield call([obj, obj.method], arg1, arg2, ...) // 如同 obj.method(arg1, arg2 ...)
 * apply 提供了另外一种调用的方式
 *    yield apply(obj, obj.method, [arg1, arg2, ...])
 * cps 表示的是延续传递风格
 *    const content = yield cps(readFile, '/path/to/file')
 * all 自动执行
 */
import { all, put, call, select } from "redux-saga/effects";
import staticActions from "./rootAction";
import { getEnv } from "./rootSelector";
import { systemInfo, applicationEnv } from "../utils";

const initEnv = function* () {
  const { ...env } = yield select(getEnv);
  Object.assign(env, applicationEnv);
  yield put((staticActions as any).env.setEnv({ ...env }));
};

const initSystem = function* () {
  let system = systemInfo;
  yield put((staticActions as any).system.setSystem(system));
};

// const takeLogout = function* () {
//   while (true) {
//     yield take((staticActions as any).user.logout);
//     // yield call(axios.post, `gateway/manage/common/api/user/logout`);
//     yield all([
//       put((staticActions as any).user.setUser({ isLogin: false })),
//       put((staticActions as any).roles.setRoles([])),
//       put((staticActions as any).auth.setAuth([])),
//       put((staticActions as any).menus.setMenus([])),
//       sessionStorage.clearAll(),
//     ]);
//     yield sessionStorage.clearAll();
//     // navigate.goTo('/common/login');
//   }
// };

// const takeLogin = function* () {
//   try {
//     const user = yield httpsClient.post(`gateway/user/smsLogin`, {
//       mobile: "13800000000",
//       code: "1111",
//     });
//     user["isLogin"] = true;
//     user["mobile"] = user.user && user.user.mobile;
//     yield put(staticActions.user.setUser(user));
//   } catch (error) {
//     yield put(staticActions.user.setUser({ isLogin: false }));
//   }
// };

// const loginSuccess = function* ({ payload }) {};

// const logout = function* ({ payload }) {};

export default function* staticSagas() {
  /**
   * 登录、登出
   */
  // yield fork(takeLogin);
  // yield fork(takeLogout);

  /**
   * 系统信息初始化
   */
  yield all([initSystem(), initEnv()]);
  // yield all([onLunch()]);
  /**
   * 权限变更
   */
  // yield takeLatest((staticActions as any).auth.queryAuth, queryUserAuth);
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
