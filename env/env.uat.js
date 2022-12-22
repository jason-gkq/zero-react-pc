module.exports.defineConfig = () => ({
  ENV: "uat",
  FILE_SERVICE_URL: "/file",
  REQUEST: {
    BASE: {
      baseURL: "http://rap2api.taobao.org/app/mock/302222/",
      successCode: 200,
    },
  },
});
