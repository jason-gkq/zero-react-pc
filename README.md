- 系统 loading、页面 loading 开发
- 页头 功能封装
- tabBar 功能封装
- 组件封装
- 页面事件监听封装

- ubt 埋点开发
- svg 处理方案；
- 媒体资源，在本地、测试和生产中方案定制；
- cdn 方案【待验证】

- content 部分采用 flex 布局封装以及验证
- 代码检查、githock 封装
- vendor 目录功能规划【存放第三方 sdk 等】

- 所有页面使用 div 布局是否可以包装为 View 组件进行开发
- fetch 封装
- 语言包看是否需要

## 指南

### 项目启动

```shell
npm install;
npm start;
```

本地访问

```js
http://localhost:8080/
```

更新包

```shell
yarn upgrade zero-react-scripts@0.2.17
```

## 框架

### 目录结构

新增页面目录结构示例：

---

home // 页面目录名  
│ - components // 页面组件目录，固定名称  
│ - │ - DivTest.js // 组件文件，大驼峰  
│ - containers // 页面组件目录，固定名称  
│ - │ - DivTest.js // 组件文件，大驼峰  
│ - index.less // 页面样式，固定名称  
│ - index.model.js // 页面 model，固定名称  
│ - index.js // 页面入口，固定名称

---

**说明**

- `index.js` 页面入口文件，代码示例：

```js
import React, { Component } from "react";
import { BasePage } from "@/common/core";
import model from "./index.model";

import DivTest from "./containers/DivTest";
@BasePage(model) // 必须
class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { $model, $globalActions } = this.props;
    return <DivTest $model={$model} $globalActions={$globalActions} />;
  }
}
export default Home;
```

- `index.model.js`用于处理页面逻辑，包括初始化的页面数据，接口请求，数据更新处理等。示例代码如下：

```js
import { createModel } from "@/common/redux";
import { put, call } from "redux-saga/effects";

export default createModel({
  name: "Home", // 存在store里的节点名
  config:{
    pageId:'',
    pageTitle:'',
    pageStatus: 'success'
    isNeedLogin: false,
    isNeedpermission: false,
  },
  state: { // 页面所需的数据字段
    systemName: "小程序",
    pageStatus: "hhh",
  },
  reducers: {
    //更新数据
    changeName(state, { payload }) {
      return {
        ...state,
        systemName: payload,
      };
    },
  },
  sagas: {
    // 一些异步操作、复杂逻辑处理
    *didMount({ $actions }) {
      console.log("pages/home/index.model.js/saga/didMount");
      yield put($actions.setState({ pageStatus: "234324" }));
    },
  },
  selectors: {}, // 从store里的提取数据
});
```

- `index.less`页面样式
- `conponents/DivTest.js` 页面的纯展示组件，不做多余逻辑处理
- `containers/DivTest.js` 页面的状态组件，用于 View 和 Store 的联接

---

### 登录流程

1. RegisterApp/componentDidMount 根据 currentUser 判断是否有用户信息，确定 isLogin 状态，isLogin = false 去调登录接口
2. NetWork 层接口返回 904、907 状态也走登录流程（先 loginOut 再 Login）
3. 登录状态标识：根据 ’用户 user 信息+ mobile 信息‘

### 全局 store 信息：通过 isGloable 配置

- user
- car
- store
- location
- subscribtion
- inviteInfo

- agentInfo
- ad

---

## API

### 基础

- 环境

  - `globalActions.env.setEnv`
  - `globalActions.env.initEnv`

- 对接

  - `globalActions.env.setAppCode`
  - `globalActions.env.setServiceUrl`

- 主题

  - `globalActions.env.changeTheme`
  - `globalActions.env.injectThemes`

- 页面信息
  - `globalActions.route.setRoute`
  - `globalActions.route.currentPage`

### 路由

- `globalActions.navigate.goTo({ url: "/home/home1" })`
- `globalActions.navigate.goBack`
- `globalActions.navigate.reLaunch`
- `globalActions.navigate.redirect`
- `globalActions.navigate.replace`

## 组件

### 基础组件

basic

- View
- ScrollView
- Swiper
- Text
- Button
- Alert
- Badge
- Toast
- Modal
- Picker
- DatePicker
- Calendar
- WingBlank 两翼留白
- WhiteSpace 上下留白
- NavNar 导航栏
- Popover 气泡
- Tabs 标签页
- Checkbox 复选框
- List

- Drawer
- Loading

### 业务组件

- 店铺信息组件 StoreInfo
- 登录组件 OathLogin
- 技术支持 TechSupport
- Loading
- PageLoading
- Share
- 选品牌-车型
- 选年款
- 客服组
- 打电话
- 支付
- 订单结果
- 公众号
- Tab

---

指南：启动、配置项（登录，权限，TabBar 配置）、打包命令

框架： 开发规范、目录结构规范、核心功能引入规范、common 和 pages 页面模块导入导出规范;

组件：基础组件、业务组件

API：页面跳转、设置主题、接口请求、缓存 cache、环境、路由，appCode 切换、请求地址切换、转发、

---

============以下内容无用，后续清理===========

### 备忘

- .gitignore 忽略不提交的 git 文件
- .prettierrc.json prettier 的规则编辑，扩展规则，可以不进行配置，使用默认配置
- .prettierignore prettier 忽略校验代码风格的文件，规则基于：Base your .prettierignore on .gitignore and .eslintignore

## 代码风格

prettier 介绍

- https://zhuanlan.zhihu.com/p/81764012?from_voters_page=true
- https://www.zhihu.com/question/325832546/answer/694680925

代码格式化主要采用 `prettier` 和 `eslint` 搭配使用，使用 `prettier` 对代码进行格式化，使用 `eslint` 进行代码错误校验。

1. 安装 vsCode 的 `prettier` 插件，并设置为保存时格式化。
2. `eslint`继承 `prettier` 格式化风格规则，不再附加其他规则

产生的包均为本地包：

- prettier 代码格式化，配合插件
- eslint 代码格式化【暂未安装】
- eslint-config-prettier eslint 默认继承使用 prettier 规则插件
- eslint-plugin-react eslint 扩展包 【暂未安装】
- @typescript-eslint/eslint-plugin eslint 扩展包 【暂未安装】
- @typescript-eslint/parser eslint 扩展包 【暂未安装】

产生配置文件：

- .prettierrc.json prettier 的规则编辑，扩展规则，可以不进行配置，使用默认配置
- .prettierignore prettier 忽略校验代码风格的文件，规则基于：Base your .prettierignore on .gitignore and .eslintignore
- .eslintrc.json eslint 对应的配置文件

```json
// 安装 eslint-config-prettier 使 eslint 可以继承 prettier 规则
{
  "env": {
    "browser": true, // 浏览器环境中的全局变量
    "es2021": true // 启用除了 modules 以外的所有 ECMAScript 6 特性
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/babel",
    "prettier/flowtype",
    "prettier/prettier",
    "prettier/react",
    "prettier/standard",
    "prettier/unicorn"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint"],
  "rules": {}
}
```

### 小程序端：
