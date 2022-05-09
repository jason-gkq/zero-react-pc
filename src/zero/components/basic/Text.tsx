import React from "react";

export default (props: any) => {
  const { children, ...restProps } = props;
  return <span {...restProps}>{children}</span>;
};
