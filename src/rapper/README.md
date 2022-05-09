### 接口使用规则

1、接口请求使用的是 `Axios`，请求拦截可以做在 `src/initHttpClient.tsx` 中  
2、接口契约和 mock 都采用 rapper，做需求拿到契约第一步首先配置 rapper，并运行对应更新接口契约命令

rap2 地址：http://rap2api.taobao.org/app/mock/297643/getInfo

更新契约命令：`yarn rapper`
