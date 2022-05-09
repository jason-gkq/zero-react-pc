import { AbstractStorage } from "./abstractStorage";

class SessionStorage extends AbstractStorage {
  constructor() {
    super("session");
  }
}

export default new SessionStorage();
