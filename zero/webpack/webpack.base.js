const path = require("path");
// const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const WorkboxPlugin = require('workbox-webpack-plugin');

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
  // mode: 'production',
  // mode: 'development',
  // devtool: 'inline-source-map',
  // devtool: 'source-map',
  entry: {
    main: "./src/index.js",
    // vendor: [
    //   'lodash'
    // ],
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: devMode ? "[name].[hash].js" : "[name].[contenthash].js",
    // chunkFilename: devMode ? 'vendors/[name].[hash].js' : 'vendors/[name].[contenthash].js',
  },
  plugins: [
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    /**
     * 技术上讲，NODE_ENV 是一个由 Node.js 暴露给执行脚本的系统环境变量。
     * 通常用于决定在开发环境与生产环境(dev-vs-prod)下，服务器工具、构建脚本和客户端 library 的行为。
     * 然而，与预期不同的是，无法在构建脚本 webpack.config.js 中，
     * 将 process.env.NODE_ENV 设置为 "production"，请查看 #2537。
     * 因此，例如 process.env.NODE_ENV === 'production' ? '[name].[hash].bundle.js' : '[name].bundle.js'
     * 这样的条件语句，在 webpack 配置文件中，无法按照预期运行。
     */
    // new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
    // TODO:多次打包，vendor 打包如果文件不变，则混淆码不变
    // new webpack.HashedModuleIdsPlugin(),
    // TODO:暂时不知道用途，离线访问
    // new WorkboxPlugin.GenerateSW({
    //   // 这些选项帮助 ServiceWorkers 快速启用
    //   // 不允许遗留任何“旧的” ServiceWorkers
    //   clientsClaim: true,
    //   skipWaiting: true
    // }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "My App",
      filename: "index.html",
      template: "public/index.html",
    }),
  ],
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         name: "commons",
  //         chunks: "initial",
  //         minChunks: 2
  //       }
  //     }
  //   }
  // },
  // devServer: {
  //   contentBase: resolve('./dist'),
  //   historyApiFallback: false,
  //   // open: true,
  //   hot: true,
  //   host: 'localhost',
  //   port: 3200,
  // },
  resolve: {
    symlinks: false,
    extensions: [".tsx", ".ts", ".js", ".mjs", ".jsx"],
  },
  performance: {
    hints: false,
    // 根据单个资源体积，控制 webpack 何时生成性能提示。默认值是：250000 (bytes)
    maxAssetSize: 100000,
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: path.resolve(__dirname, "../../src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              //
              babelrc: false,
              configFile: false,
              // 是否缓存到文件系统中
              cacheDirectory: true,
              cacheCompression: false,
              compact: true,
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    targets: {
                      ie: "11",
                      edge: "17",
                      firefox: "60",
                      chrome: "67",
                      safari: "11.1",
                    },
                    corejs: 2,
                  },
                ],
                "@babel/preset-react",
              ],
              plugins: [
                /**
                 * 你必须执行 npm install babel-plugin-transform-runtime --save-dev 来把它包含到你的项目中，
                 * 也要使用 npm install babel-runtime --save 把 babel-runtime 安装为一个依赖
                 */
                "@babel/plugin-transform-runtime",
                [
                  "@babel/plugin-proposal-decorators",
                  {
                    legacy: true,
                  },
                ],
                "@babel/plugin-proposal-class-properties",
                // "transform-decorators-legacy",
                // "@babel/plugin-syntax-dynamic-import",
                // [
                //   "import",
                //   {
                //     "libraryName": "antd",
                //     "libraryDirectory": "es",
                //     "style": true // `style: true` 会加载 less 文件
                //   }
                // ]
              ],
            },
          },
        ],
      },
      {
        test: /\.(css|less)$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          // { loader: "less-loader" },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|pdf)$/,
        use: ["url-loader", "file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
};
