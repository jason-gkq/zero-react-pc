class CookieStorage {
  constructor() {}

  getItem(sKey) {
    if (!sKey) {
      return null;
    }
    return (
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$"
          ),
          "$1"
        )
      ) || null
    );
  }

  setItem(sKey, sValue, vEnd, sPath = "/", sDomain = "") {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
      return false;
    }
    let sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires =
            vEnd === Infinity
              ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
              : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie =
      encodeURIComponent(sKey) +
      "=" +
      encodeURIComponent(sValue) +
      sExpires +
      ";SameSite=None;Secure" +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "");
    return true;
  }

  removeItem(sKey, sPath = "", sDomain = "") {
    if (!this.hasItem(sKey)) {
      return false;
    }
    document.cookie =
      encodeURIComponent(sKey) +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
      (sDomain ? "; domain=" + sDomain : "") +
      (sPath ? "; path=" + sPath : "");
    return true;
  }

  hasItem(sKey) {
    if (!sKey) {
      return false;
    }
    return new RegExp(
      "(?:^|;\\s*)" +
        encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") +
        "\\s*\\="
    ).test(document.cookie);
  }

  clearAll() {
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      keys.forEach((key) => {
        document.cookie = key + "=0;expires=" + new Date(0).toUTCString();
      });
    }
  }

  getDomain() {
    const ret = location.hostname.split(".");

    if (ret.length > 1) {
      // ip情况
      if (/^\d+$/.test(ret[0])) {
        return ret.join(".");
      } else {
        return "." + ret[ret.length - 2] + "." + ret[ret.length - 1];
      }
    } else {
      return ret[0];
    }
  }
}

export default new CookieStorage();
