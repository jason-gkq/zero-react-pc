module.exports.defineConfig = () => ({
  ENV: "uat",
  FILE_SERVICE_URL: "/file",
  REQUEST: {
    BASE: { baseURL: "http://uat.demo.com/", successCode: 200 },
  },
});
