module.exports.defineConfig = () => ({
  ENV: 'test',
  REQUEST: {
    BASE: {
      baseURL: 'http://rap2api.taobao.org/app/mock/302222/',
      successCode: 200,
    },
  },
});
