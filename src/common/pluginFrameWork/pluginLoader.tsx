import { Spin, Result } from 'antd';
import React, { useCallback, useState } from 'react';
// import { NotFound } from '../components/404';

function loadComponent(scope: any, module: any) {
  return async () => {
    try {
      // Initializes the share scope. This fills it with known provided modules from this build and all remotes
      // @ts-ignore
      // eslint-disable-next-line no-undef
      await __webpack_init_sharing__('default');
      const container = window[scope]; // or get the container somewhere else
      // Initialize the container, it may provide shared modules
      // @ts-ignore
      // eslint-disable-next-line no-undef
      await container.init(__webpack_share_scopes__.default);
      // @ts-ignore
      const factory = await window[scope].get(module);
      const Module = factory();
      return Module;
    } catch (err) {
      console.log('err is ->', err);
    }
  };
}

const urlCache = new Set();
const useDynamicScript = (url: string, key: string, force?: boolean) => {
  const [ready, setReady] = React.useState(false);
  const [errorLoading, setErrorLoading] = React.useState(false);

  React.useEffect(() => {
    if (!url) return;

    if (!force && componentCache.get(key)) {
      return;
    }

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

const separator = ',';

/** 获取路径 */
export const getPathInComponentKey = (cacheKey: string) =>
  decodeURIComponent(cacheKey.split(separator)[3]);

export const useFederatedComponent = (
  remoteUrl: string,
  scope: string,
  module: string,
  path: string,
  loaded?: (module: any) => void,
  force?: boolean
) => {
  const [index, setIndex] = useState(0);
  const key = [remoteUrl, scope, module, path]
    .map(encodeURIComponent)
    .join(separator);
  const [Component, setComponent] = React.useState<React.LazyExoticComponent<
    React.ComponentType<any>
  > | null>(null);

  const { ready, errorLoading } = useDynamicScript(remoteUrl, key, force);
  React.useEffect(() => {
    if (Component) setComponent(null);
    // Only recalculate when key changes
  }, [key]);

  React.useEffect(() => {
    if (!force && componentCache.get(key)) {
      return;
    }
    if (ready && !Component) {
      const asyncComp = loadComponent(scope, module);
      loaded && asyncComp().then(loaded);
      const Comp = React.lazy(asyncComp);
      componentCache.set(key, Comp);
      setComponent(Comp);
      setIndex(index + 1);
    }
    if (errorLoading && path) {
      componentCache.set(key, () => <Result />);
      setIndex(index + 1);
    }
    // key includes all dependencies (scope/module)
  }, [Component, ready, key, errorLoading]);

  const ComponentWrapper = useCallback(
    (props: any) => (
      <ComponentRender
        errorLoading={errorLoading}
        Component={Component}
        module={module}
        {...props}
      />
    ),
    [Component, errorLoading]
  );

  return { index, setIndex, componentCache, ComponentWrapper };
};

export const ComponentRender = ({
  errorLoading,
  Component,
  module,
  ...props
}: {
  errorLoading: boolean;
  Component: React.LazyExoticComponent<React.ComponentType<any>> | null;
  module: string;
}) => {
  if (errorLoading) {
    console.log(`Error loading module "${module}"`);
  }
  return (
    <div style={{ marginTop: '2em' }}>
      <React.Suspense fallback={<Spin />}>
        {errorLoading ? <Result /> : Component && <Component {...props} />}
      </React.Suspense>
    </div>
  );
};
