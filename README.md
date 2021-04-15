# zero-react-pc

just a demo

## 项目配置文件

- .gitignore 忽略不提交的 git 文件
- .prettierrc.json prettier 的规则编辑，扩展规则，可以不进行配置，使用默认配置
- .prettierignore prettier 忽略校验代码风格的文件，规则基于：Base your .prettierignore on .gitignore and .eslintignore

- lodash 工具库
- react
- react-copy-to-clipboard 复制剪切板操作
- react-dom
- react-hot-loader 热编译
- react-redux
- react-router
- react-router-redux
- redux
- redux-actions
- redux-mock-store 用于测试 Redux 异步操作创建者和中间件的模拟存储。模拟存储将创建一个调度操作数组，作为测试的操作日志。
- redux-thunk 异步 store 创建的中间件
- redux-logger 日志打印
- redux-arena 将 redux 与 react 打包成一个模块加载，如果 react 组件被卸载，那么 react 组件在 redux 中的 state/reducer/saga 都会被自动卸载，彻底解决 state 树和 reducer 过于庞大的问题
- redux-saga
- require

## 项目构建

1. 本地开发

```
  npm run start
```

2. 格式化代码

```
  yarn prettier --write src/index.js
```

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

#### redux

- https://zhuanlan.zhihu.com/p/26485702?utm_medium=social&utm_source=wechat_session&from=timeline&s_r=0
- https://github.com/hapood/redux-arena/blob/master/README.zh-CN.MD?utm_medium=social&utm_member=ZTIxOTllMzdkMzdmOTJjMjU5ZTQ1YmQ1NmVmM2MwMzg%3D&utm_source=wechat_session
- https://mp.weixin.qq.com/s/7xutRJpcX1doL-YzHH0jzg
- https://www.zhihu.com/question/47995437
- https://github.com/sorrycc/blog/issues/1
- https://juejin.cn/post/6844903966375936007
- https://juejin.cn/post/6880011662926364679

后续开发计划
打包中

1. 图片和 svg 是否要分开处理，图片支持 cdn，svg 可以打在包中，也可以直接放到代码中

代码框架中寻求所有的最佳解决方案

1. 请求使用 Axios，对 Axios 的封装，包含请求头请求 body 携带公共参数，以及返回错误和异常的处理；
2. 全局页面渲染错误封装主要用于页面渲染；全局 js 错误封装，收集 js 错误，并渲染对应错误页面；
3. redux 封装，并拿出最佳解决方案；
4. 语言包看是否需要改进；
5. 全局 404、403、500 页面封装；
6. 全局路由相关配置，包含自动进入 home 页，当前路由支持刷新，跳转缺省页等等
7. 页面渲染需要路由守卫，进行权限封装；
8. 全局对象封装，包含全局变量、方法、消息等；
9. 前端使用的三种缓存的封装；
10. common 中所有封装要从新改造
