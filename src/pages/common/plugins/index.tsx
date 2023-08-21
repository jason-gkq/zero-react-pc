import React, { useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import {
  ICProps,
  createPage,
  rootStore,
  navigate,
  useEnv,
  history,
  IRouteMenuItem,
} from '@/zero';
import { Button } from 'antd';
import { onMount, PluginComponent } from '@szero/plugin-remote';
import { toJS } from 'mobx';

export default createPage({ pageId: '1000' }, ({ route, params }: ICProps) => {
  const routeArr = route.split('/').filter(Boolean);
  const pluginId = routeArr[1];
  // @ts-ignore
  const [system, setSystem] = React.useState({
    url: 'http://localhost:9000',
    scope: `extension_${pluginId}`,
    module: './index.module',
  });
  useEffect(() => {
    const { ENV, appName, cachePrefix, REQUEST, route: configRoute } = useEnv(); //route: configRoute
    const { user, roles, permissions, routes } = toJS(rootStore.appStore);
    const pluginRoutes = routes[0].children.find(
      (i: IRouteMenuItem) => i.path == pluginId,
    );
    onMount({
      system,
      mountProps: {
        env: { ENV, appName, cachePrefix, REQUEST, configRoute },
        history,
        appStoreProps: { user, roles, permissions },
        user,
        roles,
        permissions,
        routes: pluginRoutes.children,
      },
    });
  }, [system]);

  return (
    <PageContainer pageHeaderRender={false}>
      <Button onClick={() => navigate.goTo('/news/user')}>go</Button>
      <Button onClick={() => navigate.goTo('/news/roles')}>come</Button>
      <PluginComponent system={system} />
    </PageContainer>
  );
});
