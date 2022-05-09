import React from "react";
import { createBrowserHistory } from "history";
import type { BrowserHistory } from "history";
import { appendParam } from "../../utils";

type IGoBack = {
  delta?: string | number;
  url?: string;
};

class configureNavigate {
  history: BrowserHistory;
  maxHistoryLength: number;
  rootModelName: string;
  navigateHistory: Array<any> = [];

  constructor() {
    this.history = createBrowserHistory();
    this.maxHistoryLength = history.length;
    this.rootModelName = (process as any).env.productConfig.appName;
    this.initHistory(this.history.location);
  }

  private initHistory = (location: {
    pathname: string;
    search: any;
    state: any;
  }) => {
    this.navigateHistory = [];
    if (!location) {
      return;
    }
    let { pathname, search, state = {} } = location;
    if (pathname === "/" || pathname === `/${this.rootModelName}`) {
      pathname = `/${this.rootModelName}/index`;
    }
    const url = search.includes("?")
      ? `${pathname}${search}`
      : `${pathname}?${search}`;
    const initLocation = this.getLocation(url, state);

    initLocation.pathname !== location.pathname &&
      this.history.push(initLocation);
    console.log("on lunch location::", initLocation);
    this.navigateHistory.push(initLocation);
    return;
  };

  private getLocation = (url: string, payload: any) => {
    const urlArr = String(url).split("?");
    const pathname = urlArr[0] || `/${this.rootModelName}/index`;
    const state = payload || {};
    const searchArr: any = [];
    if (urlArr[1]) {
      urlArr[1].split("&").reduce((state, v) => {
        if (v && v.includes("=")) {
          const temp = v.split("=");
          state[temp[0]] = temp[1];
          searchArr.push(`${temp[0]}=${temp[1]}`);
        }
        return state;
      }, state);
    }
    const key = `${pathname}:${JSON.stringify(state)}`;
    const search = searchArr.join("&");
    url = searchArr.length > 0 ? `${pathname}?${search}` : pathname;
    return {
      url,
      pathname,
      state,
      key,
    };
  };

  goToModule = (url: string, payload?: any, options?: { target?: string }) => {
    console.info(`https://${window.location.host}${url}`, "项目模块之间跳转");
    window.open(
      appendParam(`https://${window.location.host}${url}`, payload),
      options && options.target ? "target" : "_self",
      ""
    );
    return;
  };

  goTo = (
    url?: string,
    payload?: any,
    options?: { replace?: boolean; target?: string }
  ) => {
    url = url || `/${this.rootModelName}/index`;
    if (String(url).startsWith(`/`)) {
      if (options && options.replace) {
        this.redirect(url, payload);
        return;
      }
      if (!String(url).startsWith(`/${this.rootModelName}`)) {
        url = `/${this.rootModelName}${url}`;
      }
      this.history.push(url, payload);
      // const location = this.getLocation(url, payload);
      // console.log(appendParam(url, payload));
      // this.history.push(location);
      // if (this.navigateHistory.length >= this.maxHistoryLength) {
      //   this.navigateHistory = this.navigateHistory.slice(1);
      // }
      // this.navigateHistory.push(location);
      return;
    }

    if (String(url).startsWith("https:") || String(url).startsWith("http:")) {
      console.info(`${url}`, "站外跳转");
      window.open(
        appendParam(url, payload),
        options && options.target ? "target" : "_self",
        ""
      );
      return;
    }
    console.warn(`${url} 不符合规则，无法进行跳转。`);
    return;
  };

  goBack = (payload?: IGoBack) => {
    // let { delta, url = "" } = payload as any;
    // if (!delta && !url) {
    //   this.history.back();
    //   this.navigateHistory = this.navigateHistory.slice(0, -1);
    //   return;
    // }

    // if (delta && delta < 0) {
    //   this.history.go(Number(delta));
    //   this.navigateHistory = this.navigateHistory.slice(0, Number(delta));
    //   return;
    // }

    // if (url) {
    //   const tempIndex = this.navigateHistory.findIndex((item) => {
    //     return item.pathname === url;
    //   });

    //   if (tempIndex >= 0) {
    //     this.navigateHistory = this.navigateHistory.slice(0, tempIndex + 1);
    //     delta = this.navigateHistory.length - tempIndex + 1;
    //     this.history.go(delta);
    //     return;
    //   } else {
    //     this.goTo({ url });
    //     return;
    //   }
    // }

    this.history.back();
    // this.navigateHistory = this.navigateHistory.slice(0, -1);
    return;
  };

  redirect = (url?: string, payload?: any) => {
    url = url || `/${this.rootModelName}/index`;
    if (String(url).startsWith(`/`)) {
      if (!String(url).startsWith(`/${this.rootModelName}`)) {
        url = `/${this.rootModelName}${url}`;
      }
      this.history.replace(url, payload);
      // const location = this.getLocation(url, payload);
      // this.navigateHistory = this.navigateHistory.slice(0, -1);
      // this.navigateHistory.push(location);
      // this.history.replace(location);
      return;
    }

    if (String(url).startsWith("https:") || String(url).startsWith("http:")) {
      console.info("站外跳转", `${url}`);
      window.location.replace(appendParam(url, payload));
      return;
    }
    console.warn(`${url} 不符合规则，无法进行跳转。`);
    return;
  };

  reload = (url?: string) => {
    url = url || `/${this.rootModelName}/index`;
    if (
      String(url).startsWith(`/`) &&
      !String(url).startsWith(`/${this.rootModelName}`)
    ) {
      url = `/${this.rootModelName}${url}`;
    }
    console.log(`${window.location.protocol}//${window.location.host}${url}`);

    window.location.replace(
      `${window.location.protocol}//${window.location.host}${url}`
    );
    return;
  };
}

export default new configureNavigate();
