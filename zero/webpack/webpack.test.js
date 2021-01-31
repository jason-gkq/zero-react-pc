const webpack = require("webpack");
const { merge } = require("webpack-merge");
const base = require("./webpack.base.js");

module.exports = merge(base, {
  mode: "none",
  // devtool: 'inline-source-map',
  // devtool: 'cheap-module-eval-source-map',
  devtool: "source-map",
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("test"),
      SERVICE_URL: JSON.stringify("https://m.lechebang.cn/"),
    }),
  ],
});
