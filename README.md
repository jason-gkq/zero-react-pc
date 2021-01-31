# zero-react-pc

just a demo

## 项目配置文件

- .gitignore 忽略不提交的 git 文件
- .prettierrc.json prettier 的规则编辑，扩展规则，可以不进行配置，使用默认配置
- .prettierignore prettier 忽略校验代码风格的文件，规则基于：Base your .prettierignore on .gitignore and .eslintignore

## NPM 包介绍

```json
{
  "clean-webpack-plugin": "^3.0.0", // 清理dest打包文件
  "css-loader": "^5.0.1",
  "eslint-config-prettier": "^7.2.0", //
  "html-webpack-plugin": "^4.5.1", // webpack 编辑 index.html
  "less-loader": "^7.3.0", // webpack 打包支持对 less 支持
  "mini-css-extract-plugin": "^1.3.5", // webpack 压缩css代码插件，生产、堡垒和测试环境参数要求，则压缩，替换style-loader
  "prettier": "^2.2.1", // 代码格式化
  "style-loader": "^2.0.0", // webpack 非压缩css时，作为css的第一个处理loader
  "ts-loader": "^8.0.14", // webpack 打包对ts支持
  "typescript": "^4.1.3", // webpack 打包对ts支持
  "webpack": "^5.19.0", //
  "webpack-cli": "^4.4.0" // webpack 命令行工具
}
```

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

## NPM-dev

- prettier 代码格式化，配合插件
- eslint 代码格式化
- eslint-config-prettier eslint 默认继承使用 prettier 规则插件
- eslint-plugin-react eslint 扩展包
- @typescript-eslint/eslint-plugin eslint 扩展包
- @typescript-eslint/parser eslint 扩展包

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
