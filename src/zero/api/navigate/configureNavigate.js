import { createBrowserHistory } from "history";
import { appendQuery } from "../../utils";

class configureNavigate {
  constructor() {
    this.history = createBrowserHistory();
    this.maxHistoryLength = history.length;
    this.rootModelName = process.env.productConfig.appName;
    this.initHistory(this.history.location);
  }

  initHistory = (location) => {
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
    this.navigateHistory.push(this.getLocation(url, state));
    return;
  };

  getLocation = (url, payload) => {
    const urlArr = String(url).split("?");
    const pathname = urlArr[0] || `/${this.rootModelName}/index`;
    const state = payload || {};
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
  };

  goTo = ({ url, payload = {}, options = {} } = {}) => {
    if (String(url).startsWith(`/${this.rootModelName}`)) {
      if (options && options.replace) {
        this.redirect({ payload: { url, payload, options } });
        return;
      }
      const location = this.getLocation(url, payload);
      this.history.push(location);
      if (this.navigateHistory.length >= this.maxHistoryLength) {
        this.navigateHistory = this.navigateHistory.slice(1);
      }
      this.navigateHistory.push(location);
      return;
    }

    if (String(url).startsWith("https:") || String(url).startsWith("http:")) {
      window.open(
        appendQuery(url, payload),
        options.target ? "target" : "_self",
        "",
        options.replace || false
      );
      return;
    }
    if (String(url).startsWith(`/`)) {
      window.open(
        appendQuery(`https://${window.location.host}${url}`, payload),
        options.target ? "target" : "_self",
        "",
        options.replace || false
      );
      return;
    }
    console.warn(`${url} 不符合规则，无法进行跳转。`);
    return;
  };

  goBack = ({ delta, url = "" } = {}) => {
    if (!delta && !url) {
      this.history.goBack();
      this.navigateHistory = this.navigateHistory.slice(0, -1);
      return;
    }

    if (delta && delta < 0) {
      this.history.goBack(delta);
      this.navigateHistory = this.navigateHistory.slice(0, delta);
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
        return;
      } else {
        this.goTo({ payload: { url } });
        return;
      }
    }

    this.history.goBack();
    this.navigateHistory = this.navigateHistory.slice(0, -1);
    return;
  };

  redirect = ({ url, payload = {}, options = {} } = {}) => {
    const location = this.getLocation(url, payload);
    this.navigateHistory = this.navigateHistory.slice(0, -1);
    this.navigateHistory.push(location);
    this.history.replace(location);
    return;
  };
}

export default new configureNavigate();
