const webpack = require("webpack");
const { merge } = require("webpack-merge");
const base = require("./webpack.base.js");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
/**
 * 用于分析生产包大小等
 */
module.exports = merge(base, {
  mode: "production",
  // 为了安全，不在服务器上部署source-map
  // devtool: 'source-map',
  plugins: [
    new BundleAnalyzerPlugin({
      generateStatsFile: true,
    }),
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      SERVICE_URL: JSON.stringify("https://m.lechebang.com/"),
    }),
  ],
});
