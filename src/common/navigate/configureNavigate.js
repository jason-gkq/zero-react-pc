import { createBrowserHistory } from "history";
// import { cookieStorage, localStorage } from "../cache";

/**
 * 暂不放入缓存
 */
// let navigateHistory = []; //localStorage.get("navigateHistory") || [];

class configureNavigate {
  constructor() {
    this.history = createBrowserHistory();
    this.maxHistoryLength = history.length;
    this.rootModelName = process.env.productConfig.appName;
    this.initHistory(this.history.location);
    // this.history.listen((location) => {
    //   console.log("location....>>>", data);
    // });
  }

  initHistory(location) {
    this.navigateHistory = [];
    if (!location) {
      return;
    }
    let { pathname, search, state = {} } = location;
    if (pathname === "/" || pathname === `/${this.rootModelName}`) {
      pathname = `/${this.rootModelName}/index/index`;
    }
    const url = search.includes("?")
      ? `${pathname}${search}`
      : `${pathname}?${search}`;
    // action: "POP"
    this.navigateHistory.push(this.getLocation(url, state));
    return;
  }

  getLocation(url, params) {
    if (String(url).startsWith("https:")) {
      return {
        pathname: url,
      };
    }
    // if (String(url).startsWith(`/${rootModelName}`)) {
    const urlArr = String(url).split("?");
    const pathname = urlArr[0]
      ? `/${this.rootModelName}${urlArr[0]}`
      : `/${this.rootModelName}/index`;
    const state = params || {};
    const search = urlArr[1] || "";
    if (urlArr[1]) {
      urlArr[1].split("&").reduce((state, v) => {
        if (v && v.includes("=")) {
          const temp = v.split("=");
          state[temp[0]] = temp[1];
        }
        return state;
      }, state);
    }
    const key = `${pathname}:${JSON.stringify(state)}`;
    return {
      pathname,
      search,
      state,
      key,
    };
    // }
    // 跨模块调整 TODO:
    // if (String(url).startsWith(`/`)) {
    // }
  }
  goTo({ url, params = {}, options = {} } = {}) {
    if (options && options.replace) {
      this.redirect({ payload: { url, params, options } });
      return;
    }
    const location = this.getLocation(url, params);
    this.history.push(location);
    if (this.navigateHistory.length >= this.maxHistoryLength) {
      this.navigateHistory = this.navigateHistory.slice(1);
    }
    this.navigateHistory.push(location);
    // localStorage.set("navigateHistory", navigateHistory);
    return;
  }

  goBack({ delta, url = "" } = {}) {
    if (!delta && !url) {
      this.history.goBack();
      this.navigateHistory = this.navigateHistory.slice(0, -1);
      // localStorage.set("navigateHistory", navigateHistory);
      return;
    }

    if (delta && delta < 0) {
      this.history.goBack(delta);
      this.navigateHistory = this.navigateHistory.slice(0, delta);
      // localStorage.set("navigateHistory", navigateHistory);
      return;
    }

    if (url) {
      const tempIndex = this.navigateHistory.findIndex((item) => {
        return item.pathname === url;
      });

      if (tempIndex >= 0) {
        this.navigateHistory = this.navigateHistory.slice(0, tempIndex + 1);
        delta = this.navigateHistory.length - tempIndex + 1;
        this.history.goBack(delta);
        // localStorage.set("navigateHistory", navigateHistory);
      } else {
        this.goTo({ payload: { url } });
      }
    }

    this.history.goBack();
    this.navigateHistory = this.navigateHistory.slice(0, -1);
    // localStorage.set("navigateHistory", navigateHistory);
    return;
  }

  redirect({ url, params = {}, options = {} } = {}) {
    const location = this.getLocation(url, params);
    this.navigateHistory = this.navigateHistory.slice(0, -1);
    this.navigateHistory.push(location);
    // localStorage.set("navigateHistory", navigateHistory);
    this.history.replace(location);
    return;
  }

  reLaunch({ url, params = {}, options = {} } = {}) {}
}

export default new configureNavigate();
