import { cookieStorage, useEnv } from "@/zero/api";

export default () => {
  const { appName } = useEnv();
  const tokenName = `${appName}-token`;
  const setToken = (token: string) => {
    cookieStorage.setItem(tokenName, token, Infinity);
    return true;
  };

  const getToken = () => {
    return cookieStorage.getItem(tokenName);
  };

  const removeToken = () => {
    cookieStorage.removeItem(tokenName);
    return true;
  };
  return { setToken, getToken, removeToken };
};
