import React from "react";
import routes from "./routeData";
import { Route } from "react-router-dom";

const pathList = [];
const AuthList = [];

export function generateRoute() {
  let indexRoute = "";
  const routeList = Object.values(routes)
    .flat()
    .map((item) => {
      if (item.path.endsWith("/index/index")) {
        indexRoute = (
          <Route key='index' exact={true} component={item.component} />
        );
      }
      pathList.push(item.path);
      return <Route key={item.path} exact={true} {...item} />;
    });
  routeList.push(indexRoute);
  return routeList;
}

export function guardRoute() {
  return true;
}
