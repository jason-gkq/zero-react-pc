import { cloneDeep, navigate, net, useEnv, useToken } from '@/zero';

const { getToken, removeToken } = useToken();

export default (
  REQUEST: Record<string, { baseURL: string; successCode: string }>,
) => {
  net.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = token;
    }
    if (['post', 'put', 'patch'].includes(config.method)) {
      Object.assign(config.headers, {
        'Content-Type': 'application/json;charset=utf-8',
      });
    }
    const { url } = config;
    if (
      String(url).startsWith('http://') ||
      String(url).startsWith('https://')
    ) {
      return config;
    }
    config['interceptInfo'] = REQUEST.BASE;
    config.baseURL = REQUEST.BASE.baseURL;
    if (url.includes(':')) {
      const [tempBase, tempUrl] = url.split(':');
      if (REQUEST[tempBase]) {
        config['interceptInfo'] = REQUEST[tempBase];
        config.baseURL = REQUEST[tempBase].baseURL;
      }
      config.url = tempUrl;
    }

    return config;
  });
  net.interceptors.response.use((resp) => {
    const {
      data,
      config: { interceptInfo },
    } = resp || {};
    if (!interceptInfo) {
      return Promise.resolve(resp);
    }
    const { successCode } = interceptInfo;
    const code = Object.is(data.code, undefined) ? 500 : Number(data.code);
    if (code === Number(successCode)) {
      return Promise.resolve(resp);
    }
    const { needLoginCode } = useEnv();
    if (needLoginCode == Number(code)) {
      removeToken();
      sessionStorage.clearAll();
      navigate.redirect(`/login`);
    }
    const cloneResp = cloneDeep(resp || {});
    let result = {
      msg: data.msg || data.desc || '服务器内部错误',
      code,
      ...data,
    };
    cloneResp['data'] = result;
    return Promise.reject(cloneResp);
  });
  return true;
};
