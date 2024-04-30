import React, { useEffect, useState } from 'react';
import {
  ICProps,
  createPage,
  rootStore,
  useEnv,
  history,
  IRouteMenuItem,
} from '@/zero';
import { Empty } from 'antd';
import { onMount, PluginComponent } from '@szero/plugin-remote';
import { runInAction, toJS } from 'mobx';
// import { useParams } from 'react-router-dom';

const {
  ENV,
  appName,
  cachePrefix,
  REQUEST,
  route: configRoute,
  plugins,
} = useEnv(); //route: configRoute

export default createPage({ pageId: '1000' }, ({ route }: ICProps) => {
  // const { pluginId } = useParams();
  // const system = plugins[pluginId];
  const routeArr = route.split('/').filter(Boolean);
  const pluginId = routeArr[1];
  const system = plugins[pluginId];
  // @ts-ignore
  // const [system, setSystem] = useState({
  //   url: 'http://10.84.230.10/doms-plugins/doms-customer/',
  //   scope: `extension_${pluginId}`,
  //   module: './index.module',
  //   // url: 'http://localhost:8001',
  //   // scope: `extension_ydcrm`,
  //   // module: './index.module',
  // });
  console.log(system, pluginId);

  useEffect(() => {
    const { user, roles, permissions, routes } = toJS(rootStore.appStore);

    const pluginRoutes = routes[0].children.find(
      (i: IRouteMenuItem) => i.path == pluginId,
    );

    const setProLayout = (flag: boolean) => {
      runInAction(() => {
        rootStore.appStore.layout.pure = flag;
      });
    };

    onMount({
      system,
      mountProps: {
        env: { ENV, appName, cachePrefix, REQUEST, configRoute },
        history,
        appStoreProps: { user, roles, permissions, setProLayout },
        user,
        roles,
        permissions,
        routes: pluginRoutes.children,
      },
    });
  }, [system]);

  return <> {system ? <PluginComponent system={system} /> : <Empty />}</>;
});
