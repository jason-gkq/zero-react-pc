### 项目配置简介

1.  项目环境
    配置文件可自行添加，格式为：env.*.js，此处\*部分需要和package中命令传参保持一致
    打包完，对应配置信息在变量 process.env.productConfig 中获取到
    - com 公共配置
    - local 本地环境
    - uat 测试环境，用于测试人员进行测试
    - pre 堡垒环境，一般是从生产集群服务器抽样发布进行功能或回归测试
    - prod 生产环境，正式生产环境

2. 参数介绍
    - route 路由相关配置
        type Browser | Hash  默认：Browser
          路由类型，传统和哈希两种模式；
        showRoutesTab 默认：否
          是否展示历史路由标签；
        routesHistoryLength 默认：0；
          路由历史存储记录条数；
    - layout
        title 默认：undefined
          系统默认名称；
        index 默认：undefined
          再无明确路由情况下，默认跳转的页面；
    - webpackConfig
        publicUrlOrPath
          publicPath配置，建议和appName保持一致
        devServer
          webpack-dev-server 相关配置
        privateConfig
          headScripts 
            需引入的外部资源
          copyOptions
            复制到打包脚本中的外部资源
          ```js
          {
            headScripts: [
              {
                src: 'https://code.jquery.com/jquery-3.7.0.min.js',
              },
            ],
            copyOptions: {
              patterns: [
                {
                  from: 'public/font_3998592_hdp3xzsj2x7.js',
                  to: 'lib/font_3998592_hdp3xzsj2x7.js',
                },
              ],
            }
          }
          ```
        其他：
          剩余配置通过 webpack-merge 合并至webpack配置中；
    - REQUEST 接口请求部分配置，在initHttpClient中使用，只做参考，可自行设计
        BASE 接口请求配置：
          baseURL 接口请求地址；
          successCode 接口请求成功码；
