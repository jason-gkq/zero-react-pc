import federation from '@originjs/vite-plugin-federation';
import { default as pkg } from '../node_modules/@szero/pc/package.json' assert { type: 'json' };
import wbk from 'webpack';
const { ModuleFederationPlugin } = wbk.container;
const { dependencies: deps } = pkg;
import { routes } from './routes.js';

export const defineConfig = () => ({
  appId: '100',
  appName: 'web',
  cachePrefix: 'web_',
  route: {
    type: 'Browser', // Browser | Hash 可以调整路由方式，如果选择hash则最好去掉appName，且调整publicUrlOrPath
    showRoutesTab: false,
    routesHistoryLength: 1,
  },
  needLoginCode: 401,
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
    base: '/web/',
    server: {
      host: 'localhost',
      port: 3300,
      // preTransformRequests: false,
      // 代理配置参考
      // proxy: {
      //   '/gateway': {
      //     target: 'http://10.84.203.22:8800',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/gateway/, ''),
      //   },
      // },
    },
    // privateConfig: {
    //   headScripts: [
    //     {
    //       src: 'https://cdn.bootcdn.net/ajax/libs/echarts/5.4.3/echarts.common.js',
    //     },
    //   ],
    //   copyOptions: {
    //     targets: [
    //       {
    //         src: 'bin/example.wasm',
    //         dest: 'wasm-files',
    //       },
    //     ],
    //   },
    // },
    plugins: [
      /**
       * 联邦模块相关配置，基站和子模块配置
       * 和webpack的联邦模块可以混用，如果vite是子模块，则正常配置即可，如果是加载webpack的子模块，则需要特殊配置
       * 暂没找到动态加载的方法
       */
      // 基站配置 参考
      // federation({
      //   remotes: {
      //     // 暂没找到动态加载的方法
      //     remote_app: 'http://localhost:5001/remoteEntry.js',
      //   },
      //   shared: {
      //     react: {
      //       singleton: true,
      //       requiredVersion: pkg.dependencies.react,
      //       version: '16.13.1',
      //     },
      //     'react-dom': {
      //       singleton: true,
      //       requiredVersion: pkg.dependencies['react-dom'],
      //     },
      //   },
      // }),
      // 分享模块配置
      // federation({
      //   name: 'extension_remote',
      //   filename: 'remoteEntry.js',
      //   exposes: {
      //     './Button': './src/button.jsx',
      //     './Button1': './src/button1.jsx',
      //   },
      //   shared: [
      //     {
      //       react: {},
      //       'react-dom': {
      //         requiredVersion: pkg.dependencies['react-dom'],
      //         import: false,
      //       },
      //     },
      //   ],
      // }),
      // 如果vite加载的是wepack打包出来的子模块则如下配置
      federation({
        remotes: {
          remote_app: {
            external: 'http://localhost:3301/remoteEntry.js',
            from: 'webpack',
          },
        },
        shared: {
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
            // requiredVersion: deps['mobx'],
          },
          'mobx-react-lite': {
            singleton: true,
            eager: true,
            // requiredVersion: deps['mobx-react-lite'],
          },
          antd: {
            singleton: true,
            eager: true,
            // requiredVersion: deps['antd'],
          },
          '@ant-design/pro-components': {
            singleton: true,
            eager: true,
            // requiredVersion: deps['@ant-design/pro-components'],
          },
          '@szero/pc': {
            singleton: true,
            eager: true,
            requiredVersion: '2.2.0',
          },
        },
      }),
    ],
  },
  // 配合 @szero/plugin-remote 使用，可根据路由动态加载相应子模块
  plugins: {
    remote: {
      url: 'http://localhost:3301',
      scope: `extension_remote`,
      module: './index.module',
    },
  },
  webpackConfig: {
    publicUrlOrPath: '/web/',
    devServer: {
      port: 3300,
      host: 'localhost',
      allowedHosts: 'auto',
      // 代理配置参考
      // proxy: {
      //   '/gateway': {
      //     target: 'http://10.84.203.22:8800',
      //     pathRewrite: { '/gateway': '' },
      //     changeOrigin: true,
      //     proxyTimeout: 60000,
      //   },
      // },
    },
    // 项目需要特定加载的js文件以及需要copy的文件配置参考
    // privateConfig: {
    //   headScripts: [
    //     {
    //       src: 'https://cdn.bootcdn.net/ajax/libs/echarts/5.4.3/echarts.common.js',
    //     },
    //   ],
    //   copyOptions: {
    //     patterns: [
    //       {
    //         from: 'public/font_3998592_0n0toue3xba.js',
    //         to: 'lib/font_3998592_0n0toue3xba.js',
    //       },
    //     ],
    //   },
    // },
    /**
     * 如使用乾坤，则打开该配置即可
     */
    // output: {
    //   library: `admin`,
    //   libraryTarget: "umd",
    //   globalObject: "window",
    //   // jsonpFunction: `webpackJsonp_doms`,
    // },
    plugins: [
      /**
       * 联邦模块相关配置，基站和子模块配置
       * 和vite可以混用，vite打包出的子模块webpack可以正常加载，详细配置键vite
       */
      // 基站配置
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
            // requiredVersion: deps['mobx'],
            requiredVersion: '6.12.0',
          },
          'mobx-react-lite': {
            singleton: true,
            eager: true,
            // requiredVersion: deps['mobx-react-lite'],
          },
          antd: {
            singleton: true,
            eager: true,
            // requiredVersion: deps['antd'],
            requiredVersion: '5.16.5',
          },
          '@ant-design/pro-components': {
            singleton: true,
            eager: true,
            // requiredVersion: deps['@ant-design/pro-components'],
            requiredVersion: '2.7.1',
          },
          '@szero/pc': {
            singleton: true,
            eager: true,
            requiredVersion: '2.2.0',
          },
        },
      }),
      // 分享模块配置
      // new ModuleFederationPlugin({
      //   name: 'extension_remote', // 模块唯一键，且必为 extension_ 开头
      //   filename: 'remoteEntry.js', // 固定值配置
      //   exposes: {
      //     './Button': './src/Button', // 其他特殊组件分享
      //     './index.module': './src/index.module', // 整个项目以子模块加载时，固定值配置
      //   },
      //   shared: { // 分享模块，与基站配置相同
      //     react: { singleton: true, requiredVersion: false },
      //     'react-dom': { singleton: true, requiredVersion: false },
      //     'react-router-dom': { singleton: true, requiredVersion: false },
      //     mobx: {
      //       singleton: true,
      //       requiredVersion: false,
      //     },
      //     'mobx-react-lite': {
      //       singleton: true,
      //       requiredVersion: false,
      //     },
      //     antd: {
      //       singleton: true,
      //       requiredVersion: false,
      //     },
      //     '@ant-design/pro-components': {
      //       singleton: true,
      //       requiredVersion: false,
      //     },
      //     '@szero/pc': {
      //       singleton: true,
      //       requiredVersion: false,
      //     },
      //   },
      // }),
    ],
  },
  routes,
});
