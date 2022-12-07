import { default as cookieStorage } from "../cache/cookieStorage";
import { guid } from "../../utils";

class applicationEnv {
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

  setEnv = (data: any) => {
    Object.assign(this, data);
  };
}

const env = new applicationEnv();

type IEnvConfig = {
  clientId: string;
  parentSessionId: string;
  sessionId: string;
  onLunchTime: number;
  [key: string]: any;
};

export const useEnv = (): IEnvConfig => {
  return env;
};
