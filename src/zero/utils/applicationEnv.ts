import { cookieStorage } from "../api";
import { guid } from "./util";

class applicationEnv {
  // info: any;
  readonly clientId: string;
  readonly parentSessionId = guid();
  readonly sessionId = this.parentSessionId;
  readonly onLunchTime = Date.now();

  constructor() {
    let clientId = cookieStorage.getItem("__clientId");
    if (!clientId) {
      clientId = guid();
      cookieStorage.setItem(
        "__clientId",
        clientId,
        Infinity,
        "/",
        cookieStorage.getDomain()
      );
    }
    this.clientId = clientId;
    Object.assign(this, process.env.productConfig);
  }
}

export default new applicationEnv();
