import React from "react";
import GuardPermission from "./GuardPermission";
import { Button } from "antd";

type IProps = {
  children: any;
  permissions?: string[];
  [key: string]: any;
};

export default (props: IProps) => {
  const { children, permissions, type, size, ...restProps } = props;
  const buttonType = type && "primary";
  const buttonSize = size && "small";
  return (
    <>
      {permissions ? (
        <GuardPermission permissions={permissions}>
          <Button type={buttonType} size={buttonSize} {...restProps}>
            {children}
          </Button>
        </GuardPermission>
      ) : (
        <Button type={buttonType} size={buttonSize} {...restProps}>
          {children}
        </Button>
      )}
    </>
  );
};
