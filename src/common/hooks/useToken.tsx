import { cookieStorage } from "@/zero/api";

export default () => {
  const setToken = (token: string) => {
    cookieStorage.setItem("admin-token", token, Infinity);
    return true;
  };

  const getToken = () => {
    return cookieStorage.getItem("admin-token");
  };

  const removeToken = () => {
    cookieStorage.removeItem("admin-token");
    return true;
  };
  return { setToken, getToken, removeToken };
};
