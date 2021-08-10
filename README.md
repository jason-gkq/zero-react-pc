### 待开发任务列表

- 页头 功能封装
- 页面事件监听封装
- ubt 埋点开发
- cdn 方案【待验证】
- 代码检查、githock 封装
- vendor 目录功能规划【存放第三方 sdk 等】
- fetch 封装

## 指南

### 项目启动

拉取项目到本地

> [zero-react-pc](https://github.com/jason-gkq/zero-react-pc)

然后在命令行依次执行

```shell
cd zero-react-pc
yarn install
yarn start
```

本地访问

> http://localhost:8080/

打包

```shell
yarn build:dev
yarn build:uat
yarn build:pre
yarn build:prod
```

更新包

```shell
yarn upgrade zero-react-scripts@0.2.17
yarn upgrade zero-react-scripts --latest
```

### 全局 store 信息：通过 isGloable 配置

- system 系统信息
- env 项目相关信息
- route 路由、菜单及页面信息
- navigate 跳转方法
- user 用户信息
- shop 当前店铺
- auth 权限

> globalActions

- .shop.changeShop 切换店铺
- .navigate.goTo
- .navigate.goBack
- .navigate.redirect
- .navigate.reLaunch

> globalSelectors

- getState
- getEnv
- getSystem
- getRoute
- getUser
- getShop

---

### 目录结构

项目目录结构介绍

zero-react-pc  
│ - dest 打包  
│ - env 环境变量配置  
│ - node_modules 依赖包  
│ - public 静态资源  
│ - │ - assets 图片、svg 等静态资源  
│ - │ - themes ant 组件主题颜色设置  
│ - │ - index.html html 模板页面  
│ - src  
│ - │ - common 公共页面  
│ - │ - pages 页面  
│ - │ - zero 框架代码  
│ - │ - app.js 项目启动页  
│ - │ - app.less 全局样式  
│ - │ - app.model.js 全局 store，可自行扩展  
│ - │ - index.js 项目入口  
│ - .gitignore  
│ - jsconfig.json 项目 js 配置文件  
│ - package.json  
│ - yarn.lock

---

新增页面目录结构示例：  
**页面详细使用规则参考 /pages/demo **

home // 页面目录名，单个单词  
│ - components // 页面组件目录，固定名称  
│ - │ - DivTest.js // 组件文件，大驼峰  
│ - containers // 页面组件目录，固定名称  
│ - │ - DivTest.js // 组件文件，大驼峰  
│ - index.less // 页面样式，固定名称  
│ - index.model.js // 页面 model，固定名称  
│ - index.js // 页面入口，固定名称

---

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
- Popover 气泡
- Tabs 标签页
- Checkbox 复选框
- List
- Drawer
- Loading

### 业务组件

- Loading
- PageLoading

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

---

## 以下内容无用，后续清理

框架： 开发规范、目录结构规范、核心功能引入规范;

组件：基础组件、业务组件

API：页面跳转、设置主题、接口请求、缓存 cache、环境、路由，appCode 切换、请求地址切换、转发、

---

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
