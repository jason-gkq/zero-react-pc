module.exports.defineConfig = () => ({
  ENV: "pre",
  FILE_SERVICE_URL: "/file",
  REQUEST: {
    BASE: { baseURL: "http://pre.demo.com/", successCode: 200 },
  },
});
