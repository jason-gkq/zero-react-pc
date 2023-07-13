import { useEffect, useState } from 'react';
import { pluginConfig } from './types';
import { getPathInComponentKey, useFederatedComponent } from './pluginLoader';
import { pluginsStore } from './pluginStore';

/**
m is component like:
export default {
  routerConfig: [{title: 'xx', path: 'xx', component: XXX }]
}
export const intl = {
  languageMap: { dev: {}, en: {}, zh: {}},
  languagePrefix: 'plugin-x'
}
*/

type LoadedCallback = (m: {
  default: {
    routerConfig?: any;
    i18n?: {
      languageMap: { [key: string]: { [key: string]: string } };
      languagePrefix: string;
    };
  };
  intl?: {
    languageMap: { [key: string]: { [key: string]: string } };
    languagePrefix: string;
  };
}) => void;
export const usePluginHost = (
  configs: pluginConfig[],
  loaded?: LoadedCallback
) => {
  const { setPlugin } = pluginsStore();
  const [item, setItem] = useState({
    config: {
      url: '',
      scope: '',
      module: '',
      path: '',
    },
  });
  const { url, scope, module, path } = item.config;
  const { index, setIndex, componentCache }: any = useFederatedComponent(
    url,
    scope,
    module,
    path,
    loaded
  );
  useEffect(() => {
    // set component to store
    if (configs.length <= index) {
      for (const [key, value] of componentCache) {
        const path = getPathInComponentKey(key);
        const obj: {
          [key: string]: any;
        } = {};
        if (path) {
          obj[path] = {
            component: value,
          };
          setPlugin(obj, path);
        }
      }
    }
  }, [index]);
  useEffect(() => {
    // configs changes,reload
    setIndex(0);
  }, [configs]);
  useEffect(() => {
    // load every config
    if (configs.length > index) {
      const item = configs[index];
      setItem(item);
    }
  }, [index, configs]);
};
