import React from "react";
import { connect } from "react-redux";
import { Routes, Route } from "react-router-dom";
import type { RouteProps } from "react-router-dom";
import { PageLoading, Exception, View } from "../components";
import { globalSelectors } from "../redux";

const Layout = React.lazy(
  () => import(/* webpackChunkName: 'app' */ "../components/layouts/proLayout")
);

const RoutesComponent = (props: {
  appName: string;
  routes: RouteProps[];
  noneLayoutRoutes: RouteProps[];
}) => {
  const { appName, routes, noneLayoutRoutes } = props;
  return (
    <Routes>
      <Route path={`/${appName}`}>
        <Route
          element={
            <React.Suspense
              fallback={
                <View
                  style={{
                    height: "100vh",
                  }}
                >
                  <PageLoading />
                </View>
              }
            >
              <Layout />
            </React.Suspense>
          }
        >
          {routes}
          <Route
            path='*'
            key='*'
            element={
              <React.Suspense fallback={<PageLoading />}>
                <Exception code={404} />
              </React.Suspense>
            }
          />
        </Route>
        {noneLayoutRoutes}
      </Route>
    </Routes>
  );
};

export default connect((state) => {
  const { appName } = globalSelectors.getEnv(state);
  const { noneLayoutRoutes, routes } = globalSelectors.app.getState(state);
  return { appName, noneLayoutRoutes, routes };
})(RoutesComponent);
