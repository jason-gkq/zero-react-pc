## 项目使用

一个项目从技术选型到承载着大量的业务上线是一个复杂的过程，从项目生命周期管理、页面生命周期管理到 api 和组件的封装以及 css 的规划，随着业务复杂度和页面的增多对应复杂度会成几何倍数增加，如果没有合理的规划，项目越来越难以开发和维护，此项目适用于移动端 H5，是基于业务开发过程中总结得出，在技术框架基础上做了业务框架的规划，技术栈采用 `react` `react-router` `redux` `redux-saga` `axios` `antd` `webpack`，项目分为配置文件、媒体资源以及源码存放，源码中又有公共页面以及组件、业务代码编写以及业务框架抽成以及封装。如果后期项目过大需要做分项目和分模块，则可以把业务框架单独放置一个仓库，各个项目引用该仓库进行多个项目公用公司内部框架。

采用相同的项目结构以及语法进行了多个端的项目框架整理，也有使用过多端编译的框架，但是不同端在同一个项目中开发还是会有影响，且多个端的兼容性代码要写在一起，以及框架的相关问题会跟新不及时，使用方解决需要花费大量精力，所以稳定型项目且有专人负责的，建议还是自研，如果是快销项目建议采用多端编译。

- [zero-react-m](https://github.com/jason-gkq/zero-react-m) 移动端 h5
- [zero-react-pc](https://github.com/jason-gkq/zero-react-pc) pc 端
- [zero-react-micro](https://github.com/jason-gkq/zero-react-micro) 小程序端
- [zero-react-native](https://github.com/jason-gkq/zero-react-native) 手机端 rn

#### 项目启动

```shell
yarn install
yarn start
```

#### 打包

```shell
yarn build:dev
yarn build:uat
yarn build:pre
yarn build:prod
```

#### 本地访问

```js
http://localhost:8080/
```

## 项目简介

### 目录结构

zero-react-pc  
| - dest/web // 打包后代码目录  
| - env // 项目业务参数配置  
| - | - env.com.json // 各个环境公共参数  
| - | - env.dev.json // 开发环境  
| - | - env.local.json // 本地  
| - | - env.pre.json // 预发布  
| - | - env.prod.json // 生产  
| - | - env.uat.json // 测试  
| - node_modules  
| - public  
| - | - assets // 媒体资源存放  
| - | - themes // 多主题配置  
| - | - index.html // html 模板  
| - | - manifest.json  
| - src  
| - | - common // 公共组件&页面  
| - | - pages // 业务页面  
| - | - zero // 框架核心文件  
| - | - app.js // 入口  
| - | - app.less // 全局样式  
| - | - app.model.js // 全局 model 配置  
| - | - index.js  
| - jsconfig.json
| - package.json

新增页面目录结构示例：

home // 页面目录名  
│ - components // 页面组件目录，固定名称  
│ - │ - DivTest.js // 组件文件，大驼峰  
│ - containers // 页面组件目录，固定名称  
│ - │ - DivTest.js // 组件文件，大驼峰  
│ - index.less // 页面样式，固定名称  
│ - index.model.js // 页面 model，固定名称  
│ - index.js // 页面入口，固定名称

---

### 参考官网

> [webpack](https://webpack.docschina.org/concepts/)  
> [babel](https://www.babeljs.cn/docs/options)  
> [ES6](http://es6.ruanyifeng.com/)  
> [react](https://react.docschina.org/docs/getting-started.html)  
> [redux](http://cn.redux.js.org/)  
> [redux-saga](https://redux-saga-in-chinese.js.org/)  
> [React Router](https://react-guide.github.io/react-router-cn/docs/Introduction.html)

### 社区好文推荐

> [redux 系列总结](https://juejin.cn/post/6880011662926364679)  
> [分布式事务：Saga 模式](https://www.jianshu.com/p/e4b662407c66?from=timeline&isappinstalled=0)  
> [深入理解 React 高阶组件](https://www.jianshu.com/p/0aae7d4d9bc1)  
> [React 从渲染原理到性能优化](https://www.cnblogs.com/chaoyuehedy/p/9638848.html)
