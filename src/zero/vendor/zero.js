/**
 * 顶级对象构造
 * jsApi 可以全部进入该对象
 */
import { localStorage } from "../api/";
import axios from "axios";

((w) => {
  w.Zero = {
    request: axios.request,
    get: axios.get,
    post: axios.post,
    setStorageSync: localStorage.set,
    getStorageSync: localStorage.get,
    removeStorageSync: localStorage.remove,
  };
})(window);
