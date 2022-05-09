import { Button } from "antd";
import React from "react";
import GuardPermission from "./GuardPermission";

type IProps = {
  children: any;
  permissions?: string[];
  [key: string]: any;
};

export default (props: IProps) => {
  const { children, permissions, ...restProps } = props;
  return (
    <>
      {permissions ? (
        <GuardPermission permissions={permissions}>
          <Button type='link' size='small' {...restProps}>
            {children}
          </Button>
          {/* <a {...restProps}>{children}</a> */}
        </GuardPermission>
      ) : (
        <Button type='link' size='small' {...restProps}>
          {children}
        </Button>
      )}
    </>
  );
};
