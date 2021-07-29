import { AbstractStorage } from "./abstractStorage";

class LocalStorage extends AbstractStorage {
  constructor() {
    super("local");
  }
}

export default new LocalStorage();
