### 项目配置简介

1.  项目环境

    - com 公共配置
    - local 本地环境
    - uat 测试环境，用于测试人员进行测试
    - pre 堡垒环境，一般是从生产集群服务器抽样发布进行功能或回归测试
    - prod 生产环境，正式生产环境

2.  配置文件  
    **每次配置文件修改不会立即生效，需要重启服务**  
     com 为公共参数配置，各个环境无差异参数配置；各个环境差异化参数需配置在各个环境对应的配置文件中

    ```js
    {
      // 项目唯一标识
      "appId": "100",
      // 模块名称，所有静态资源以及路由都会以该名称做前缀
      "appName": "唯一",
      // 缓存前缀标识，解决同源下的两个模块缓存变量冲突问题
      "cachePrefix": "xxx_",
      // layout相关配置
      "layout": {
        "title": "管理中台", // 项目名称；layout右上角显示名称
        "index": "/index/index" // 项目默认首页
      },
      "webpackConfig": {
        "publicUrlOrPath": "/admin/", // publicUrlOrPath配置，建议和appName保持一致
        "headScripts": [
          {
            "src": "lodash.js" // 单独加载的js文件
          }
        ]
      },
      ... // 其他配置，通过useEnv() 可以获取相关配置信息
    }
    ```

    环境配置文件示例：

    ```json
    {
      "ENV": "pre", // 当前环境变量标识 [local | uat | pre | prod]
      "FILE_SERVICE_URL": "/", // 本地文件服务器
      // 接口请求地址，可以配置绝对地址，也可以配置相对地址
      "REQUEST": {
        // 接口请求标识
        "BASE": {
          // 当前标识对应的地址
          "baseURL": "http://rap2api.taobao.org/",
          // 当前标识接口请求成功的code
          "successCode": 200
        }
      }
    }
    ```
