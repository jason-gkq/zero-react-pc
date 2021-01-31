const webpack = require("webpack");
const { merge } = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const base = require("./webpack.base.js");

module.exports = merge(base, {
  mode: "none",
  devtool: "source-map",
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("baolei"),
      SERVICE_URL: JSON.stringify("https://mtest.lechebang.com/"),
    }),
  ],
});
