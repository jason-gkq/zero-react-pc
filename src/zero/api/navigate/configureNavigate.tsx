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
  indexPage: string;
  navigateHistory: Array<any> = [];

  constructor() {
    this.history = createBrowserHistory({ window });
    this.maxHistoryLength = history.length;
    const {
      layout: { index },
      appName,
    } = process.env.productConfig as any;
    this.rootModelName = appName;
    this.indexPage = `/${appName}${index || "/index"}`;
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
    let { pathname, search } = location;
    if (
      pathname === "/" ||
      pathname === `/${this.rootModelName}` ||
      pathname === `/${this.rootModelName}/`
    ) {
      pathname = this.indexPage;
      this.navigateHistory.push({ url: pathname });
      this.history.push(pathname);
    }
    if (search && search != "?") {
      pathname = search.includes("?")
        ? `${pathname}${search}`
        : `${pathname}?${search}`;
    }
    console.log("init-LLL", pathname);

    this.navigateHistory.push({ url: pathname });
    return;
  };

  goTo = (
    url?: string,
    payload?: any,
    options?: { replace?: boolean; target?: string }
  ) => {
    url = url || this.indexPage;
    if (String(url).startsWith(`/`)) {
      if (options && options.replace) {
        this.redirect(url, payload);
        return;
      }
      if (!String(url).startsWith(`/${this.rootModelName}`)) {
        url = `/${this.rootModelName}${url}`;
      }
      if (this.navigateHistory.length >= this.maxHistoryLength) {
        this.navigateHistory = this.navigateHistory.slice(1);
      }
      this.navigateHistory.push({ url, payload });
      this.history.push(url, payload);
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
    this.navigateHistory = this.navigateHistory.slice(0, -1);
    return;
  };

  redirect = (
    url?: string,
    payload?: Record<string, any>,
    options?: { isRedirect: boolean }
  ) => {
    url = url || this.indexPage;
    if (String(url).startsWith(`/`)) {
      if (!String(url).startsWith(`/${this.rootModelName}`)) {
        url = `/${this.rootModelName}${url}`;
      }
      // if (options && options.isRedirect && !url.includes("redirect")) {
      //   const { url: redirect } =
      //     this.navigateHistory[this.navigateHistory.length - 1];
      //   url = appendParam(url, { redirect });
      // }
      // console.log("begin", this.navigateHistory);

      this.navigateHistory = this.navigateHistory.slice(0, -1);
      this.navigateHistory.push({ url, payload });
      this.history.replace(url, payload);
      // console.log("end", this.navigateHistory);
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
    url = url || this.indexPage;
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
