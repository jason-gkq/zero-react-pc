import React from "react";
export default {
  index: [
    {
      path: "/backend/index",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'index' */ /* webpackMode: 'lazy' */ "@/src/pages/index"
        )
      ),
    },
  ],
  common: [
    {
      path: "/backend/common/login",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'login' */ /* webpackMode: 'lazy' */ "@/common/pages/login"
        )
      ),
    },
  ],
  demo: [
    {
      path: "/backend/demo/example",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'example' */ /* webpackMode: 'lazy' */ "@/src/pages/demo/example"
        )
      ),
    },
  ],
  workbench: [
    {
      path: "/backend/workbench/download",
      component: React.lazy(() =>
        import(
          /* webpackChunkName: 'download' */ /* webpackMode: 'lazy' */ "@/src/pages/workbench/download"
        )
      ),
    },
  ],
};
