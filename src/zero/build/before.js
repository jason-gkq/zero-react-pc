"use strict";

const fs = require("fs");
const path = require("path");
const spawn = require("cross-spawn");

const rootPath = path.resolve(__dirname, "../../../").replace(/\\/g, "/");
const env = require("../../../env/env.com.json");

function listFile(dir, list = []) {
  const arr = fs.readdirSync(dir);
  arr.forEach(function (item) {
    const fullpath = path.join(dir, item);
    const stats = fs.statSync(fullpath);
    if (
      stats.isDirectory() &&
      !fullpath.endsWith("Containers") &&
      !fullpath.endsWith("Components")
    ) {
      listFile(fullpath, list);
    } else {
      if (stats.isFile() && fullpath.endsWith("index.js")) {
        list.push(fullpath);
      }
    }
  });
  return list;
}

function getRoutes() {
  const routes = { index: [], common: [] };
  const commonList = listFile(`${rootPath}/src/common/pages`);
  commonList.forEach((fullPath) => {
    const filePath = fullPath.replace(/\\/g, "/");
    const routePath = filePath.split("pages")[1].split("/index.js")[0];
    const routePathArr = routePath.split("/");
    const modelName = "common";
    const chunkName = routePathArr[routePathArr.length - 1];
    // const modelName = /\/\w*\//.exec(routePath)[0].replace(/\//g, "");
    const path = `/${env.appName}/common${routePath}/index`;
    const component = `$React.lazy(() =>import(/* webpackChunkName: '${chunkName}' */ /* webpackMode: 'lazy' */ '@/common/pages${routePath}'))$`;

    if (!routes[modelName]) {
      routes[modelName] = [];
    }
    routes[modelName].push({
      path,
      component,
    });
  });
  const list = listFile(`${rootPath}/src/pages`);
  list.forEach((fullPath) => {
    const filePath = fullPath.replace(/\\/g, "/");
    const routePath = filePath.split("pages")[1].split("/index.js")[0];
    const routePathArr = routePath.split("/");
    const modelName = routePathArr[1];
    const chunkName = routePathArr[routePathArr.length - 1];
    // const modelName = /\/\w*\//.exec(routePath)[0].replace(/\//g, "");
    const path = `/${env.appName}${routePath}/index`;
    const component = `$React.lazy(() =>import(/* webpackChunkName: '${chunkName}' */ /* webpackMode: 'lazy' */ '@/src/pages${routePath}'))$`;

    if (!routes[modelName]) {
      routes[modelName] = [];
    }
    routes[modelName].push({
      path,
      component,
    });
  });
  return routes;
}
const routes = getRoutes();

const str =
  'import React from "react";export default ' + JSON.stringify(routes);

fs.writeFileSync(
  `${rootPath}/src/zero/navigate/routeData.js`,
  str.replace(/(\"\$)|(\$\")/g, "")
);

spawn.sync(
  "prettier",
  [`${rootPath}/src/zero/navigate/routeData.js`, "--write"],
  { stdio: "inherit", shell: true }
);
