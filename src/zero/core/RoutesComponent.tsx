import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import type { RouteProps } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { PageLoading, Exception } from "../components";
import { globalSelectors } from "../redux";

const Layout = React.lazy(
  () => import(/* webpackChunkName: 'app' */ "../components/layouts/proLayout")
);

const getPageLazyComponent = (
  component: string
): React.ReactElement | undefined => {
  if (!component || component === "Layout") {
    return;
  }

  const Element: any = React.lazy(
    () => import(/* webpackMode: "lazy" */ `@/src/pages/${component}`)
  );

  if (!Element) {
    return;
  }
  return (
    <React.Suspense fallback={<PageLoading />}>
      <Element />
    </React.Suspense>
  );
};
/**
 * 构建Route树挂载所有路由
 * @param data
 * @param isLayout
 * @param prefix
 * @returns
 */
const getRouters = (
  data: any[],
  isLayout = false,
  prefix = "",
  pIsNoneLayout?: boolean | undefined
) => {
  const res: any[] = [];
  for (let i = 0; i < data.length; i++) {
    const { children, path, isNoneLayout, component } = data[i];
    // 获取树形结构的path路径，用于获取component
    const newprefix = prefix ? `${prefix}/${path}` : path;
    if (children && Array.isArray(children) && children.length > 0) {
      // 父级layout向下透传
      const newPIsLayout = Reflect.has(data[i], "isNoneLayout")
        ? isNoneLayout
        : pIsNoneLayout;

      const childrenRoutes: any[] = getRouters(
        children,
        isLayout,
        newprefix,
        newPIsLayout
      );
      if (childrenRoutes.length > 0) {
        const Element = getPageLazyComponent(component && component.trim());
        if (Element) {
          res.push(
            <Route key={`${path}/*`} path={`${path}/*`}>
              <Route path="*" element={Element} />
              {childrenRoutes}
            </Route>
          );
        } else {
          res.push(
            <Route path={path} key={`${path}${i}`}>
              {childrenRoutes}
            </Route>
          );
        }
      }
    } else {
      let flag;
      /**
       * 优先当前节点定义
       * 其次为父级节点定义
       * 如果都没定义则取默认值 false
       */
      if (!Object.is(isNoneLayout, undefined)) {
        flag = isNoneLayout;
      } else if (!Object.is(pIsNoneLayout, undefined)) {
        flag = pIsNoneLayout;
      } else {
        flag = Boolean(isNoneLayout);
      }
      if (Object.is(isLayout, flag)) {
        const newElement = component ? component : newprefix;
        const Element = getPageLazyComponent(newElement && newElement.trim());
        if (Element) {
          res.push(<Route path={path} key={`${path}${i}`} element={Element} />);
        }
      }
    }
  }
  return res;
};
/**
 * 本地路由树和接口路有树合并去重
 * @param tree
 * @returns
 */
const treeIterator = (tree: any[]) => {
  const arr: any[] = [];
  if (!Array.isArray(tree) || !tree.length) return arr;
  tree.forEach((e: any) => {
    const index = arr.findIndex((i) => i.path == e.path);
    if (e.children) {
      if (index > -1) {
        arr[index] = {
          ...e,
          ...arr[index],
          children: treeIterator([...arr[index].children, ...e.children]),
        };
      } else {
        arr.push({ ...e, children: treeIterator(e.children) });
      }
    } else {
      if (index < 0) {
        arr.push({ ...e });
      } else {
        arr[index] = { ...e, ...arr[index] };
      }
    }
  });

  return arr;
};

type IProps = {
  appName: string;
  routes: RouteProps[];
  errorInfo?: any;
};

const RoutesComponent = ({ appName, routes, errorInfo }: IProps) => {
  const [treeRoutes, setTreeRoutes] = useState<any>();
  const [treeNoRoutes, setTreeNoRoutes] = useState<any>();
  useEffect(() => {
    const treeData = treeIterator(routes);
    setTreeRoutes(getRouters(treeData, false));
    setTreeNoRoutes(getRouters(treeData, true));
  }, [JSON.stringify(routes)]);

  return (
    <Routes>
      <Route path={`/${appName}`}>
        {treeNoRoutes}
        <Route
          path="error"
          key="error"
          element={
            <React.Suspense fallback={<PageLoading />}>
              <Exception {...errorInfo} />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense
              fallback={
                <div
                  style={{
                    height: "100vh",
                  }}
                >
                  <PageLoading />
                </div>
              }
            >
              <Layout />
            </React.Suspense>
          }
        >
          {treeRoutes}
          <Route
            path="*"
            key="*"
            element={
              <React.Suspense fallback={<PageLoading />}>
                <Exception code={404} />
              </React.Suspense>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default connect((state) => {
  const { appName, routes: configRoutes = [] } = globalSelectors.getEnv(state);
  const routes = globalSelectors.app.getRoutes(state);
  return { appName, routes: configRoutes.concat(routes) };
})(RoutesComponent);
