import React from "react";
import { connect } from "react-redux";
import { globalSelectors } from "../../../redux";

type IDictProps = {
  permissions?: string[];
  permissionList: string[];
  checkPermission: Function;
  children: any;
};

const GuardPermission = <P extends IDictProps>(props: P) => {
  const { permissions, permissionList, checkPermission } = props;
  if (!permissions || permissions.length == 0) {
    return props.children;
  }
  const hasPermissions = checkPermission(permissionList, permissions);
  return <>{hasPermissions && props.children}</>;
};
export default connect((state) => {
  const permissionList = globalSelectors.app.getPermissions(state);
  const { checkPermission } = globalSelectors.app.getMixinMethods(state);
  return { permissionList, checkPermission };
})(GuardPermission);
