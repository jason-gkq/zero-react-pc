import React, { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { SkeletonProps, Skeleton } from 'antd';
import { pluginsStore } from './pluginStore';

const Component = ({
  path,
  skeletonConfig,
  skeletonType,
  ...props
}: {
  path: string;
  skeletonConfig?: SkeletonProps;
  skeletonType?: 'Button' | 'Avatar' | 'Input' | 'Image';
  [key: string]: any;
}) => {
  const [updateTime, setUpdateTime] = useState('init');
  const { getPluginById, subscribe, unsubscribe } = pluginsStore();
  if (!path) return null;
  const { component: Comp } = getPluginById(path);
  useEffect(() => {
    const callBack = () => {
      setUpdateTime(new Date().toLocaleString());
    };
    subscribe(path, callBack);
    return () => {
      unsubscribe(path, callBack);
    };
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Skeleton {...skeletonConfig} />}>
        {Comp ? (
          <Comp key={path} {...props} />
        ) : (
          <Skeleton {...skeletonConfig} />
        )}
      </Suspense>
    </ErrorBoundary>
  );
};

export const PluginComponent = React.memo(Component);
