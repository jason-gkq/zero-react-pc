import { makeAutoObservable, runInAction } from 'mobx';
import {
  HttpClient,
  localStorage,
  sessionStorage,
  navigate,
  useEnv,
  IRouteMenuItem,
  useToken,
} from '@/zero';
import initHttpClient from './initHttpClient';
import Logo from '@/assets/logo/logo.svg';
// import Icon, { createFromIconfontCN } from "@ant-design/icons";

// const IconFont = createFromIconfontCN({
//   scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
// });

const whiteRoutes = ['/login', '/tools'];

type IOptions = {
  route: string;
  params?: any;
  [key: string]: any;
};

type IRoutes = {
  component: string;
  visible: string;
  meta: { title: string; icon: string };
  path: string;
  redirect: string;
  children?: IRoutes[];
  [key: string]: any;
};

const routesFormat = (routes: IRoutes[]) => {
  const newRoutes: IRouteMenuItem[] = [];
  for (let i = 0; i < routes.length; i++) {
    let { path, visible, meta, children, redirect, component } = routes[i];
    path = (path && path.trim()) || '';
    if (path && path.startsWith('/')) {
      path = path.slice(1);
    }
    if (children && children.length > 0) {
      const childreRoutes = routesFormat(children);
      newRoutes.push({
        children: childreRoutes,
        component,
        path,
        redirect,
        hideInMenu: Boolean(Number(visible)),
        name: meta.title && meta.title.trim(),
        icon: meta.title && meta.icon.trim(),
      });
    } else {
      newRoutes.push({
        path,
        redirect,
        component,
        hideInMenu: Boolean(Number(visible)),
        name: meta.title && meta.title.trim(),
        icon: meta.title && meta.icon.trim(),
      });
    }
  }
  return newRoutes;
};

const { getToken, removeToken } = useToken();
const env = useEnv();

export class AppStore {
  appStatus: 'loading' | 'error' | 'success' = 'loading';
  errorInfo: any;
  user = {};
  roles = [];
  permissions = [];
  routes: IRouteMenuItem[] = [];
  launchInfo = {};
  layout = {
    logo: Logo,
    title: '中台项目',
  };
  constructor() {
    if (process.env.NODE_ENV === 'development') {
      env.setEnv({ ...(localStorage.get('env') || {}) });
    }
    /**
     * 设置http拦截器
     */
    initHttpClient(env.REQUEST, async () => {
      return this.logout();
    });
    makeAutoObservable(this);
  }
  /* 静默授权获取凭证code */
  *onLaunch(options: IOptions) {
    console.log('app onLunch start', options);
    const { params, route } = options;
    yield runInAction(() => {
      this.launchInfo = options;
    });

    /**
     * 如果启动页为登录页，则直接进入登录页
     * 用户信息等其他信息暂不获取
     * 前置设置信息：
     *  1、http拦截器一定要设置，在登录页面会用到
     *  2、登录页的路由一定要注册，如果路由信息从接口获取，则可以先把登录页面的路由注册完成
     *     登录完成会刷新浏览器再设置其他路由
     */
    if (whiteRoutes.includes(route)) {
      yield runInAction(() => {
        this.appStatus = 'success';
      });
      return;
    }
    /**
     * 如果启动时无token，则重定向到登录页面进行登录操作
     */
    let token = getToken();
    if (!token) {
      yield runInAction(() => {
        this.appStatus = 'success';
      });
      navigate.redirect(`/login`);
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
    let originRoutes: IRouteMenuItem[] = sessionStorage.get('originRoutes');
    if (!originRoutes || originRoutes.length <= 0) {
      const { data } = yield HttpClient.get('getRouters');
      const newData = routesFormat(data);
      sessionStorage.set('originRoutes', newData);
      originRoutes = newData;
    }
    /**
     * 获取用户信息
     */
    let userAuth = sessionStorage.get('userInfo');
    try {
      if (!userAuth) {
        const result: Promise<any> = yield HttpClient.get('getUserInfo');
        userAuth = result;
        sessionStorage.set('userInfo', result);
      }
    } catch (error) {
      userAuth = {};
    }
    const { permissions, roles, user } = yield userAuth;

    yield runInAction(() => {
      this.appStatus = 'success';
      this.user = user;
      this.permissions = permissions;
      this.roles = roles;
      this.routes = originRoutes;
    });
    console.log('app onLunch end');
  }
  /**
   * 统一页面拦截
   * @returns
   */
  pageBeforeOnLoad({ pageStore, params, route, pageConfig }: any) {
    return true;
  }
  checkPermission() {
    return true;
  }
  onHide() {}
  async logout() {
    try {
      const token = getToken();
      /**
       * 调用登出接口
       */
      if (token) {
        await HttpClient.post('logout');
      }
    } catch (error) {}

    /**
     * 初始化全局数据
     * 清理session中业务数据
     * 删除token
     */
    await sessionStorage.clearAll();
    removeToken();
    navigate.redirect(`/login`);
  }
}

const appStore = new AppStore();

export default appStore;
