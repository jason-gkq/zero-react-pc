import React from "react";

const route = {
  name: "角色管理",
  routeProps: {
    path: "/lcbtest/users/roleManage",
    component: React.lazy(() =>
      import(/* webpackChunkName: 'rolemanage' */ "./index")
    ),
  },
  permKey: "menu.roleManage",
};

export default route;
