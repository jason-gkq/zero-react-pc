import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { ICProps, createPage } from '@/zero';
// import { useRegisterPlugin } from '@/common/pluginFrameWork/registerPlugin';
// import { PluginComponent } from '@/common/pluginFrameWork/PluginComponent';

function loadComponent(scope: any, module: any) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    // @ts-ignore
    await __webpack_init_sharing__('default');
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    // @ts-ignore
    await container.init(__webpack_share_scopes__.default);
    // @ts-ignore
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

const urlCache = new Set();
const useDynamicScript = (url: any) => {
  const [ready, setReady] = React.useState(false);
  const [errorLoading, setErrorLoading] = React.useState(false);

  React.useEffect(() => {
    if (!url) return;

    if (urlCache.has(url)) {
      setReady(true);
      setErrorLoading(false);
      return;
    }

    setReady(false);
    setErrorLoading(false);

    const element = document.createElement('script');

    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    element.onload = () => {
      urlCache.add(url);
      setReady(true);
    };

    element.onerror = () => {
      setReady(false);
      setErrorLoading(true);
    };

    document.head.appendChild(element);

    return () => {
      urlCache.delete(url);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    errorLoading,
    ready,
  };
};

const componentCache = new Map();
export const useFederatedComponent = (
  remoteUrl: any,
  scope: any,
  module: any
) => {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = React.useState(null);

  const { ready, errorLoading } = useDynamicScript(remoteUrl);
  React.useEffect(() => {
    if (Component) setComponent(null);
    // Only recalculate when key changes
  }, [key]);

  React.useEffect(() => {
    if (ready && !Component) {
      const Comp: any = React.lazy(loadComponent(scope, module));
      componentCache.set(key, Comp);
      setComponent(Comp);
    }
    // key includes all dependencies (scope/module)
  }, [Component, ready, key]);

  return { errorLoading, Component };
};

export default createPage({ pageId: '1000' }, ({ route, params }: ICProps) => {
  const routeArr = route.split('/').filter(Boolean);
  const pluginId = routeArr[1];
  // @ts-ignore
  const [{ module, scope, url }, setSystem] = React.useState({});
  const path = `${pluginId}/index.module`;
  // useRegisterPlugin({
  //   config: {
  //     scope: `extension_${pluginId}`,
  //     url: 'http://localhost:9000/index.js',
  //     //url: plugin.homepage,
  //     path,
  //     module: './index.module',
  //   },
  // });
  useEffect(() => {
    // setSystem({
    //   url: 'http://localhost:9000/index.js',
    //   scope: `extension_${pluginId}`,
    //   module: './index.module',
    // });
  }, []);

  const { Component: FederatedComponent, errorLoading }: any =
    useFederatedComponent(url, scope, module);

  console.log(FederatedComponent, path, '>>>>>');

  return (
    <PageContainer pageHeaderRender={false}>
      {errorLoading
        ? `Error loading module "${module}"`
        : FederatedComponent && <FederatedComponent />}
      {/* <PluginComponent path={path} baseUrl={`/admin/${pluginId}`} /> */}
    </PageContainer>
  );
});
// export default function ModuleApp() {
//   const { pluginId } = useParams();
//   const rights = useCurrentUserPermissions();
//   const [loading, setLoading] = useState(true);
//   const [plugin, setPlugin] = useState();
//   const [config, setConfig] = useState<Config | {}>({
//     config: {},
//   });
//   useRegisterPlugin(config);

//   const path = `${pluginId}/index.module`;
//   async function initPlugins() {
//     setLoading(true);
//     let config = {};
//     const pluginList = await getInstalledList();
//     const plugin = pluginList.find(p => p.pluginId == pluginId);
//     if (isModule(plugin)) {
//       config = {
//         config: {
//           scope: `extension_${pluginId}`,
//           url: 'http://localhost:9000/index.js',
//           //url: plugin.homepage,
//           path,
//           module: './index.module',
//         },
//       };

//       setConfig(config);
//       setPlugin(plugin);
//     }
//     setLoading(false);
//   }

//   useEffect(() => {
//     initPlugins();
//   }, [pluginId]);

//   useEffect(() => {
//     if (plugin) {
//       document.title = plugin?.name || '应用集成';
//     }
//   }, [plugin]);

//   if (loading) {
//     return <Spin />;
//   }

//   return (
//     <Layout>
//       {!plugin ? (
//         <div className="uninstall-plugin">插件未安装或已卸载</div>
//       ) : (
//         <PluginComponent
//           path={path}
//           rights={rights}
//           baseUrl={`/mktapp/instance/${pluginId}`}
//         />
//       )}
//     </Layout>
//   );
// }
// export const isModule = plugin => {
//   if (!plugin) return false;
//   const isModuleUrl = plugin.homepage?.split('?')[0].endsWith('.js');
//   const isInnerPlugin = plugin.deployType == 'inner' || plugin.deployType == 'private'; // 私有部署private
//   const installed = !!plugin.installedVersion;
//   return isModuleUrl && isInnerPlugin && installed;
// };

// type Config = {
//   config: {
//     scope: string;
//     url: string;
//     path: string;
//     module: './index.module';
//   };
// };
