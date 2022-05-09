import React from "react";
import { put, call, select, all } from "redux-saga/effects";
import { message } from "antd";
import { Route } from "react-router-dom";
import type { RouteProps } from "react-router-dom";
import { createModel } from "@/zero/redux";
import { HttpClient, sessionStorage, navigate } from "@/zero/api";
import { PageLoading } from "@/zero/components";
import { cloneDeep, appendParam, guid } from "@/zero/utils";
import type { MenuDataItem, ISagas } from "@/zero/types/zero";
import { useToken } from "@/common/hooks";
import initHttpClient from "./initHttpClient";
// import useRoutes from "./routes";

// import Icon, { createFromIconfontCN } from "@ant-design/icons";

// const IconFont = createFromIconfontCN({
//   scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
// });

import { HomeOutlined, SettingOutlined } from "@ant-design/icons";

type ISagaPayload = {
  payload: any;
};
type IRoutes = {
  alwaysShow: boolean;
  component: string;
  hidden: string;
  meta: { title: string; icon: string };
  name: string;
  path: string;
  redirect: string;
  children?: IRoutes[];
  [key: string]: any;
};

/**
 * 免登录白名单
 */
// const loginWhiteListUrl: string[] = ["/admin/login", "/admin/login"];

const menuIcons = new Map([
  ["index", <HomeOutlined />],
  ["system", <SettingOutlined />],
]);

const getPageLazyComponent = (
  component: string
): React.ReactElement | undefined => {
  if (component === "Layout") {
    return;
  }
  if (component.endsWith("/Index")) {
    component = component.replace(/Index/, "index");
  }
  const Element = React.lazy(
    () =>
      import(
        /* webpackMode: "lazy" */ /* webpackChunkName: "[request]" */ /* webpackPrefetch: true */ `@/src/pages/${component}`
      )
  );
  if (!Element) {
    return;
  }
  return (
    <React.Suspense fallback={<PageLoading />}>
      <Element />
    </React.Suspense>
  );
};

/**
 * 菜单组装数据格式为：MenuDataItem
 * @param routes
 * @returns
 */
const getItems = (
  routes: IRoutes[]
): { routes: RouteProps[]; menus: MenuDataItem[] } => {
  const tempRoutes: any = [];
  const tempMenus: any[] = [];
  for (let i = 0; i < routes.length; i++) {
    let { path, hidden, meta, component, children } = routes[i];
    path = (path && path.trim()) || "";
    if (path && path.startsWith("/")) {
      path = path.slice(1);
    }
    const Element = getPageLazyComponent(component && component.trim());
    if (children && children.length > 0) {
      const { routes: childrenRoutes, menus: childrenMenus } =
        getItems(children);
      tempMenus.push({
        routes: childrenMenus,
        path,
        hideInMenu: Boolean(Number(hidden)),
        name: meta.title && meta.title.trim(),
        icon: menuIcons.has(meta.icon) && menuIcons.get(meta.icon),
      });
      if (Element) {
        tempRoutes.push(
          <Route key={`${path}/*`} path={`${path}/*`}>
            <Route path='*' element={Element} />
            {childrenRoutes}
          </Route>
        );
      } else {
        tempRoutes.push(
          <Route path={path} key={path}>
            {childrenRoutes}
          </Route>
        );
      }
    } else {
      tempMenus.push({
        path,
        hideInMenu: Boolean(Number(hidden)),
        name: meta.title && meta.title.trim(),
        icon: menuIcons.has(meta.icon) && menuIcons.get(meta.icon),
      });
      tempRoutes.push(<Route path={path} key={path} element={Element} />);
    }
  }
  return { routes: tempRoutes, menus: tempMenus };
};

const getRouterAndMenu = (
  data: IRoutes[]
): { routes: RouteProps[]; menus: MenuDataItem[] } => {
  const cloneRoutes = cloneDeep(data);
  cloneRoutes.unshift(
    {
      alwaysShow: true,
      component: "index/index",
      hidden: "0",
      meta: { title: "首页", icon: "index" },
      name: "Index",
      path: "/index",
      redirect: "noRedirect",
    },
    {
      alwaysShow: true,
      component: "system/user/profile/index",
      hidden: "1",
      meta: { title: "用户中心", icon: "" },
      name: "System-User-Profile",
      path: "/system/user/profile",
      redirect: "noRedirect",
    },
    {
      alwaysShow: true,
      component: "system/dict/data/index",
      hidden: "1",
      meta: { title: "数据字典", icon: "" },
      name: "System-Dict-data",
      path: "/system/dict/data",
      redirect: "noRedirect",
    }
  );
  return getItems(cloneRoutes);
};

const Login = React.lazy(
  () => import(/* webpackChunkName: 'login' */ "@/src/pages/login")
);

const { setToken, getToken, removeToken } = useToken();
/**
 * @param name 此model为全局系统启动model，名称为 app 不可更改，需要保证唯一
 * @param isGlobal 固定值 true，不可修改
 * -- state 中节点介绍 --
 * @param appStatus success|error|loading 系统状态；
 * @param errorInfo 当appStatus为error时，展示全局错误信息；包含两个变量，code 和 msg
 * @param user 用户信息
 * @param roles 角色信息
 * @param permissions 权限信息
 * @param menus 菜单格式必须符合：MenuDataItem
 * @param routes 路由为 react-router-dom 路由节点
 * @param noneLayoutRoutes 路由为 react-router-dom 路由节点，该节点下路由无layout，全屏展示，例如：登录
 */
const model = createModel({
  name: "app",
  isGlobal: true,
  // 初始state状态
  state: {
    appStatus: "loading",
    errorInfo: {},
    user: {},
    roles: [],
    permissions: [],
    routes: [],
    noneLayoutRoutes: [
      <Route
        path='login'
        key='login'
        element={
          <React.Suspense fallback={<PageLoading />}>
            <Login />
          </React.Suspense>
        }
      />,
    ],
    menus: [],
    mixinMethods: {
      /**
       * 页面加载之前会调用该方法，返回true则为已登录，false为没有登录
       * 如果当前页面不需要该验证，则在页面配置中 isLogin 设置为 false
       * 如果页面需要登录且该方法返回false，则自动调用 logout方法
       * @param 调用时候会自动 传入 user 信息
       * @returns
       */
      checkLogin(user: any): boolean {
        return !!getToken();
      },
      /**
       * 用于权限检查的方法
       * @param allPermission
       * @param permissions
       * @returns
       */
      checkPermission(
        permissions: string[],
        checkPermissions: string[]
      ): boolean {
        if (!checkPermissions || checkPermissions.length <= 0) {
          return false;
        }
        const exemptionPermission = "*:*:*";
        const hasPermissions = permissions.some((permission: string) => {
          return (
            exemptionPermission === permission ||
            checkPermissions.includes(permission)
          );
        });
        return hasPermissions;
      },
    },
  },
  reducers: {},
  sagas: {
    /**
     * 如果项目启动页为登录页（还包括其他无需登录页面）
     *    则直接完成启动流程，跳转至登录页
     * 如果项目启动为非登录页
     *  如果有hasLogin和code 则直接进行登录接口调用且保存token，根据已有逻辑不会出现此情况
     *  如果有token 则获取用户信息以及路由信息，项目启动完成
     *  如果没有token 则启动流程完结，并跳转至登录页进入登录流程
     *
     * @param param0
     * @param param1
     * @returns
     */
    *onLunch(
      { $actions, $globalSelectors }: ISagas,
      { payload }: ISagaPayload
    ) {
      console.log("app onLunch", payload);
      const { ENV, REQUEST } = yield select($globalSelectors.getEnv);
      const { $route, $payload } = payload;
      /**
       * 设置http拦截器
       */
      yield call(initHttpClient, REQUEST);

      /**
       * 如果启动页为登录页，则直接进入登录页
       * 用户信息等其他信息暂不获取
       * 前置设置信息：
       *  1、http拦截器一定要设置，在登录页面会用到
       *  2、登录页的路由一定要注册，如果路由信息从接口获取，则可以先把登录页面的路由注册完成
       *     登录完成会刷新浏览器再设置其他路由
       */
      if (["/admin/login"].includes($route)) {
        yield put(
          $actions.setState({
            appStatus: "success",
          })
        );
        return;
      }
      /**
       * 如果启动时无token，则重定向到登录页面进行登录操作
       */
      let token = getToken();

      if (!token) {
        let redirect = $payload.redirect;
        if (!redirect) {
          redirect = encodeURIComponent(appendParam($route, $payload));
        }
        navigate.redirect(`/login?redirect=${redirect}`);
        yield put(
          $actions.setState({
            appStatus: "success",
          })
        );
        return;
      }

      /**
       * 采用静态配置路由，而没用接口 originRoutes 数据
       * 原因：
       * 1、静态配置路由可以配置webpackChunkName，单个页面可以为一个chunk，更合理
       * 2、由于路由规则不一样，部分路由暂时不能对上
       * 会引发的问题：
       * 1、菜单配置的路由和本地静态路由必须对应
       */
      let originRoutes: IRoutes[] = sessionStorage.get("originRoutes");
      if (!originRoutes || originRoutes.length <= 0) {
        try {
          const { data } = yield call(HttpClient.get, "getRouters");
          sessionStorage.set("originRoutes", data);
          originRoutes = data;
        } catch (error: any) {
          const { code = 500, msg = "网络异常，请重新登录！" } = error;
          msg && message.error("网络异常，请重新登录！");
          yield put(
            $actions.setState({
              appStatus: "error",
              errorInfo: { code, msg },
            })
          );
          yield put($actions.logout(payload));
          return;
        }
      }

      try {
        const { routes, menus } = getRouterAndMenu(originRoutes);

        /**
         * 获取用户信息
         */
        let userAuth = sessionStorage.get("userInfo");
        if (!userAuth) {
          const result: Promise<any> = yield call(
            HttpClient.get,
            "getUserInfo"
          );
          userAuth = result;
          sessionStorage.set("userInfo", result);
        }

        const { permissions, roles, user } = userAuth;
        yield put(
          $actions.setState({
            user,
            roles,
            permissions,
            routes,
            menus,
            appStatus: "success",
          })
        );
        console.log("app onLunch done");
      } catch (error: any) {
        const { code = 500, msg = "网络异常，请重新登录！" } = error;
        msg && message.error("网络异常，请重新登录！");
        yield put(
          $actions.setState({
            appStatus: "error",
            errorInfo: { code, msg },
          })
        );
        console.warn("app onLunch error", error);
        // yield put($actions.logout(payload));
      }
    },
    /**
     * 登出操作
     * @param ISagas
     * @param { payload: {$route, $payload} } 当前页面路由和参数，可能为空
     */
    *logout({ $actions, $globalSelectors }: ISagas, { payload }: ISagaPayload) {
      try {
        const token = getToken();
        /**
         * 调用登出接口
         */
        if (token) {
          yield call(HttpClient.post, "logout");
        }
      } catch (error) {}

      /**
       * 初始化全局数据
       * 清理session中业务数据
       * 删除token
       */
      yield all([put($actions.initState()), call(sessionStorage.clearAll)]);
      removeToken();
      navigate.redirect(`/login`);
    },
  },
  selectors: {
    getUser({ user }: any) {
      return user;
    },
    getRoles({ roles }: any) {
      return roles;
    },
    getPermissions({ permissions }: any) {
      return permissions;
    },
    getRoutes({ routes }: any) {
      return routes;
    },
    getMenus({ menus }: any) {
      return menus;
    },
    getMixinMethods({ mixinMethods }: any) {
      return mixinMethods;
    },
  },
});

export default model;
