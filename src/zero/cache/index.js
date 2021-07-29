export { default as cookieStorage } from "./cookieStorage";
import localStorage from "./localStorage";
export { default as localStorage } from "./localStorage";
export { default as sessionStorage } from "./sessionStorage";

export const storage = {
  setStorageSync: localStorage.set,
  getStorageSync: localStorage.get,
  removeStorageSync: localStorage.remove,
};
