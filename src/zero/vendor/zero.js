/**
 * 顶级对象构造
 * jsApi 可以全部进入该对象
 */
import { localStorage, navigate } from "../api/";
import axios from "axios";

((w) => {
  w.Zero = {
    request: axios.request,
    get: axios.get,
    post: axios.post,
    goTo: navigate.goTo,
    goBack: navigate.goBack,
    redirect: navigate.redirect,

    setStorageSync: localStorage.set,
    getStorageSync: localStorage.get,
    removeStorageSync: localStorage.remove,
  };
})(window);
