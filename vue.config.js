const CopyWebpackPlugin = require("copy-webpack-plugin");
let num = Math.floor(Math.random() * 5);
const sta = process.env.NODE_ENV === "production" ? "ss_static/" : "";
let arr = [
  "//teacher.yiyatalk.com/teacher-static/",
  "//teacher.yiyatalk.com/teacher-static/",
  "//teacher.yiyatalk.com/teacher-static/",
  "//teacher.yiyatalk.com/teacher-static/",
  "//teacher.yiyatalk.com/teacher-static/"
];
const BASE_URL = process.env.NODE_ENV === "production" ? arr[num] : "";
module.exports = {
  publicPath: BASE_URL,
  assetsDir: process.env.NODE_ENV === "production" ? "ss_static" : "./",
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.plugins = config.plugins.concat([
        new CopyWebpackPlugin([
          // {
          //   from: "./static/win-app",
          //   to: "./win-app",
          //   ignore: [".*"]
          // },
          {
            from: "./static/title_logo.png",
            to: "./",
            ignore: [".*"]
          }
        ])
      ]);
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  productionSourceMap: false,
  chainWebpack: config => {
    config.performance.hints(false),
    config.output
      .chunkFilename(sta + "[name].[hash:8].chunk.js")
      .filename(sta + "teacher-app/[name].[hash:8].bundle.js");
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://apiv1.yiyatalk.com",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
          "^/api": "/"
        }
      }
    },
    disableHostCheck: true
  }
};
