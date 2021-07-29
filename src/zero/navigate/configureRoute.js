import React from "react";
import routes from "./routeData";
import { Route } from "react-router-dom";
import { storage } from "../cache";
import { flatDeep } from "../utils";

const allPageRoute = [];
let routerRules = [];

export function generateRoute() {
  let indexRoute = "";
  const fullRoutes = [];
  const routeList = Object.values(routes)
    .flat()
    .map((item) => {
      if (item.path.endsWith("/index/index")) {
        indexRoute = (
          <Route key='index' exact={true} component={item.component} />
        );
      }
      allPageRoute.push(item.path);
      if (item.path.endsWith("/login/index")) {
        fullRoutes.push(<Route key={item.path} exact={true} {...item} />);
      } else {
        return <Route key={item.path} exact={true} {...item} />;
      }
    });
  routeList.push(indexRoute);
  return { routeList, fullRoutes };
}

export function injectRouterRules(rules) {
  routerRules = rules;
}

export function guardRoute(route) {
  if (routerRules && routerRules.length > 0) {
    return routerRules.includes(route);
  }
  const { routerRules: routerRulesCache } =
    storage.getStorageSync("userAuth") || {};
  if (routerRulesCache && routerRulesCache.length > 0) {
    return routerRulesCache.includes(route);
  }
  return false;
}

export class ConfigureMenu {
  allMenuRoute = {};
  allMenus = {};

  constructor(menus) {
    this.generateMenuPath = this.generateMenuPath.bind(this);
    const allMenuArr = this.generateMenuPath(menus);
    const allMenuArrFlat = flatDeep(allMenuArr);
    allMenuArrFlat.map((item) => {
      this.allMenuRoute[item.path] = item.keyPath;
    });
  }

  generateMenuPath(menus, keys = null) {
    if (!Array.isArray(menus)) {
      return;
    }
    const menuList = menus.map((item) => {
      this.allMenus[item.key] = item.title;
      if (item.children && item.children.length > 0) {
        return this.generateMenuPath(
          item.children,
          keys ? `${keys},${item.key}` : item.key
        );
      } else {
        return {
          key: item.key,
          path: item.link,
          keyPath: `${keys},${item.key}`,
        };
      }
    });

    return menuList;
  }

  getBreadcrumb(path) {
    let rel = "首页";
    if (!path) {
      return rel;
    }
    if (this.allMenuRoute[path]) {
      const keys = this.allMenuRoute[path].split(",");
      keys.map((key) => {
        if (this.allMenus[key]) {
          rel = `${rel} / ${this.allMenus[key]}`;
        }
      });
      return rel;
    }
    return rel;
  }

  getSelectKeys(path) {
    if (!path) {
      return [];
    }
    if (this.allMenuRoute[path]) {
      return this.allMenuRoute[path].split(",");
    }
    return [];
  }
}
