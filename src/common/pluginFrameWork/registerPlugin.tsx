import { pluginsStore } from './pluginStore';
import { pluginConfig } from './types';
import { getPathInComponentKey, useFederatedComponent } from './pluginLoader';

export const useRegisterPlugin = (
  plugin: pluginConfig,
  loaded?: (module: any) => void,
  force?: boolean
) => {
  const { url, scope, module, path } = plugin.config;
  const { setPlugin } = pluginsStore();

  const { componentCache }: any = useFederatedComponent(
    url,
    scope,
    module,
    path,
    loaded,
    force
  );
  console.log('componentCache>>>>', componentCache);

  for (const [key, value] of componentCache) {
    const keyPath = getPathInComponentKey(key);
    console.log(keyPath, path);

    const obj: {
      [key: string]: any;
    } = {};
    // if (path === keyPath) {
    //   obj[path] = {
    //     component: value,
    //   };
    //   setPlugin(obj, path);
    // }
  }
};
