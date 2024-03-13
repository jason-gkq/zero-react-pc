// const { ModuleFederationPlugin } = require('webpack').container;
// const deps = require('../package.json').dependencies;
// const deps = require('../node_modules/@szero/pc/package.json').dependencies;
// import { ModuleFederationPlugin } from 'webpack/container';
// import { ModuleFederationPlugin } from 'webpack';
// import { routes } from './routes.js';
// -----------------------
import { default as pkg } from '../node_modules/@szero/pc/package.json' assert { type: 'json' };
import wbk from 'webpack';
const { ModuleFederationPlugin } = wbk.container;
const { dependencies: deps } = pkg;

const defineConfig = () => ({
  appId: '100',
  appName: 'admin',
  cachePrefix: 'admin_',
  route: {
    type: 'Browser', // Browser | Hash 可以调整路由方式，如果选择hash则最好去掉appName，且调整publicUrlOrPath
    showRoutesTab: false,
    routesHistoryLength: 1,
  },
  layout: {
    title: '管理中台',
    index: '/index/index',
  },
  REQUEST: {
    BASE: {
      baseURL: 'http://rap2api.taobao.org/app/mock/302222/',
      successCode: 200,
    },
  },
  viteConfig: {
    base: '/admin/',
    server: {
      host: 'localhost',
      port: 3300,
      // preTransformRequests: false,
    },
  },
  webpackConfig: {
    publicUrlOrPath: '/admin/',
    devServer: {
      port: 8080,
      host: 'localhost',
    },
    privateConfig: {
      // copyOptions
      // headScripts
    },
    // output: {
    //   library: `admin`,
    //   libraryTarget: "umd",
    //   globalObject: "window",
    //   // jsonpFunction: `webpackJsonp_doms`,
    // },
    plugins: [
      new ModuleFederationPlugin({
        name: 'master',
        shared: {
          // ...deps,
          react: { singleton: true, eager: true, requiredVersion: deps.react },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-dom'],
          },
          'react-router-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-router-dom'],
          },
          mobx: {
            singleton: true,
            eager: true,
            requiredVersion: deps['mobx'],
          },
          'mobx-react-lite': {
            singleton: true,
            eager: true,
            requiredVersion: deps['mobx-react-lite'],
          },
          antd: {
            singleton: true,
            eager: true,
            requiredVersion: deps['antd'],
          },
          '@ant-design/pro-components': {
            singleton: true,
            eager: true,
            requiredVersion: deps['@ant-design/pro-components'],
          },
          '@szero/pc': {
            singleton: true,
            eager: true,
            requiredVersion: deps['@szero/pc'],
          },
        },
      }),
    ],
  },
  routes: [
    {
      path: 'index',
      name: '首页',
      hideInMenu: false,
      icon: 'HomeOutlined',
      component: 'index/index',
      redirect: '/index/index',
      children: [
        {
          path: 'index',
          icon: 'HomeOutlined',
          hideInMenu: false,
          name: '首页',
        },
      ],
    },
    {
      path: 'news',
      component: 'common/plugins',
      name: '消息',
      hideInMenu: false,
      icon: 'HomeOutlined',
      isPlugin: true,
      children: [
        {
          path: 'user',
          hideInMenu: false,
          icon: 'UserOutlined',
          name: '用户列表',
        },
        {
          path: 'roles',
          hideInMenu: false,
          icon: 'RobotOutlined',
          name: '角色管理',
        },
      ],
    },
    {
      path: 'system',
      name: '系统',
      icon: 'SettingOutlined',
      hideInMenu: false,
      redirect: '/system/user',
      children: [
        {
          path: 'user',
          hideInMenu: false,
          icon: 'UserOutlined',
          name: '用户列表',
        },
        {
          path: 'menu',
          hideInMenu: false,
          icon: 'ProfileOutlined',
          name: '菜单管理',
        },
        {
          path: 'role',
          hideInMenu: false,
          icon: 'RobotOutlined',
          name: '角色管理',
        },
        {
          path: 'profile',
          hideInMenu: true,
          name: '个人中心',
        },
      ],
    },
    {
      path: 'login',
      name: '登录',
      isNoneLayout: true,
    },
  ],
});
export { defineConfig };
