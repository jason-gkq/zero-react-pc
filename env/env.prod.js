module.exports.defineConfig = () => ({
  ENV: "prod",
  FILE_SERVICE_URL: "/file",
  REQUEST: {
    BASE: { baseURL: "http://prod.demo.com/", successCode: 200 },
  },
});