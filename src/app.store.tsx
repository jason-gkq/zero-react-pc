import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  HttpClient,
  sessionStorage,
  navigate,
  useEnv,
  type IRouteMenuItem,
  useToken,
  appendParam,
} from '@/zero';
import initHttpClient from './initHttpClient';
import Logo from '@/assets/logo/logo.svg';
import RightContentRender from './common/RightContentRender';
import { Button } from 'antd';
// import Icon, { createFromIconfontCN } from "@ant-design/icons";

// const IconFont = createFromIconfontCN({
//   scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
// });

type IOptions = {
  route: string;
  params?: any;
  [key: string]: any;
};

// type IRoutes = {
//   component: string;
//   visible: string;
//   meta: { title: string; icon: string };
//   path: string;
//   redirect: string;
//   children?: IRoutes[];
//   [key: string]: any;
// };

// const routesFormat = (routes: IRoutes[]) => {
//   const newRoutes: IRouteMenuItem[] = [];
//   for (let i = 0; i < routes.length; i++) {
//     let { path, visible, meta, children, redirect, component } = routes[i];
//     path = (path && path.trim()) || '';
//     if (path && path.startsWith('/')) {
//       path = path.slice(1);
//     }
//     if (children && children.length > 0) {
//       const childreRoutes = routesFormat(children);
//       newRoutes.push({
//         children: childreRoutes,
//         component,
//         path,
//         redirect,
//         hideInMenu: Boolean(Number(visible)),
//         name: meta.title && meta.title.trim(),
//         icon: meta.title && meta.icon.trim(),
//       });
//     } else {
//       newRoutes.push({
//         path,
//         redirect,
//         component,
//         hideInMenu: Boolean(Number(visible)),
//         name: meta.title && meta.title.trim(),
//         icon: meta.title && meta.icon.trim(),
//       });
//     }
//   }
//   return newRoutes;
// };

const { getToken, removeToken } = useToken();
const env = useEnv();
if (process.env.NODE_ENV !== 'development') {
  try {
    const { defineConfig } = await import(
      `../env/env.${process.env.BUILD_ENV}.js`
    );
    env.setEnv(defineConfig());
  } catch (error) {}
}

// 免登录页面路由白名单
const whiteRoutes = [`/${env.appName}/login`, `/${env.appName}/tools`];

export class AppStore {
  appStatus: 'loading' | 'error' | 'success' = 'loading';
  errorInfo: any;
  user = {};
  roles = [];
  permissions = [];
  routes: IRouteMenuItem[] = [
    {
      path: env.appName,
      isRouteRoot: true,
      children: env.routes,
    },
  ];
  layout = {
    token: {
      header: {
        heightLayoutHeader: 48, // header 高度
        colorTextMenu: '#333333',
        colorTextMenuSelected: 'rgba(42,122,251,1)', //menuItem 的选中字体颜色
      },
      sider: {
        colorMenuBackground: '#fff', // menu 的背景颜色
        colorMenuItemDivider: '#dfdfdf', // menuItem 分割线的颜色
        colorTextMenu: '#595959', // menuItem 的字体颜色
        colorTextMenuSelected: 'rgba(42,122,251,1)', //menuItem 的选中字体颜色
        colorBgMenuItemSelected: 'rgba(230,243,254,1)', //menuItem 的选中背景颜色	 旧版：#1890ff 新版：rgba(230,243,254,1)
        colorBgMenuItemHover: 'rgba(230,243,254,1)',
      },
      pageContainer: {
        paddingBlockPageContainerContent: 8,
        paddingInlinePageContainerContent: 8,
        colorBgPageContainer: '#f5f5f5',
      },
    },
    menuItemRender: (item: any, dom: any) => (
      <a
        onClick={() => {
          if (item.redirect?.startsWith('/')) {
            navigate.goTo(item.redirect);
          } else {
            navigate.goTo(item.path);
          }
        }}
        style={{ fontWeight: '500' }}
      >
        {dom}
      </a>
    ),
    logo: Logo,
    title: '中台项目',
    layout: 'mix',
    contentWidth: 'Fluid',
    splitMenus: true,
    rightContentRender: () => {
      return <RightContentRender logout={() => this.logout()} />;
    },
  };
  constructor() {
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
    const redirect = encodeURIComponent(appendParam(route, params));
    if (!token) {
      yield runInAction(() => {
        this.appStatus = 'success';
      });
      navigate.redirect(`/login?redirect=${redirect}`);
      return;
    }
    try {
      /**
       * 采用静态配置路由，而没用接口 originRoutes 数据
       * 原因：
       * 1、静态配置路由可以配置webpackChunkName，单个页面可以为一个chunk，更合理
       * 2、由于路由规则不一样，部分路由暂时不能对上
       * 会引发的问题：
       * 1、菜单配置的路由和本地静态路由必须对应
       */
      // let originRoutes: IRouteMenuItem[] = sessionStorage.get('originRoutes');
      // if (!originRoutes || originRoutes.length <= 0) {
      //   const { data } = yield HttpClient.get('getRouters');
      //   const newData = [
      //     {
      //       path: env.appName,
      //       isRouteRoot: true,
      //       children: treeIterator(routesFormat(data).concat(env.routes)), //routesFormat(data).concat(env.routes),
      //     },
      //   ];
      //   sessionStorage.set('originRoutes', newData);
      //   originRoutes = newData;
      // }
      /**
       * 获取用户信息
       */
      let userAuth = sessionStorage.get('userInfo');
      if (!userAuth) {
        const result: Promise<any> = yield HttpClient.get('getUserInfo');
        userAuth = result;
        sessionStorage.set('userInfo', result);
      }

      const { permissions, user } = yield userAuth;

      yield runInAction(() => {
        this.appStatus = 'success';
        this.user = user;
        this.permissions = permissions;
      });
    } catch (error: any) {
      if (error && Number(error.code) == env.needLoginCode) {
        sessionStorage.clearAll();
        yield removeToken();
        yield runInAction(() => {
          this.appStatus = 'success';
          this.user = {};
          this.permissions = [];
        });
        navigate.redirect(`/login?redirect=${redirect}`);
      } else {
        let status: any = 500;
        if (error && Number(error.code) == 403) {
          status = 403;
        }
        yield runInAction(() => {
          this.appStatus = 'error';
          this.user = {};
          this.permissions = [];
          this.errorInfo = {
            status,
            title: '项目无法打开，请联系管理员！',
            extra: (
              <Button
                type='primary'
                danger
                onClick={() => {
                  navigate.redirect(`/login?redirect=${redirect}`);
                }}
              >
                刷新项目
              </Button>
            ),
          };
        });
      }
    }
    console.log('app onLunch end');
  }
  /**
   * 统一页面拦截
   * @returns
   */
  pageBeforeOnLoad({ pageStore, params, route, pageConfig }: any) {
    return true;
    // 如果做权限验证，则在这里做
    // if (pageConfig && Reflect.has(pageConfig, 'permissions')) {
    //   const pFlag = this.checkPermission(pageConfig.permissions);
    //   if (!pFlag) {
    //     runInAction(() => {
    //       pageStore.pageStatus = 'error';
    //       pageStore.errorInfo = {
    //         status: 403,
    //         title: '无权访问',
    //         extra: (
    //           <Button
    //             type='primary'
    //             danger
    //             onClick={() => {
    //               navigate.redirect('/index');
    //             }}
    //           >
    //             返回首页
    //           </Button>
    //         ),
    //       };
    //     });
    //   }
    //   return pFlag;
    // }
    // return true;
  }
  checkPermission(checkPermissions?: string[]) {
    return true;
    // 权限验证方法
    // if (
    //   !this.permissions ||
    //   this.permissions.length <= 0 ||
    //   !checkPermissions ||
    //   checkPermissions.length <= 0
    // ) {
    //   return false;
    // }

    // const exemptionPermission = '*:*:*';
    // const hasPermissions = this.permissions.some((permission: string) => {
    //   return (
    //     exemptionPermission === permission ||
    //     checkPermissions.includes(permission)
    //   );
    // });
    // return hasPermissions;
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
