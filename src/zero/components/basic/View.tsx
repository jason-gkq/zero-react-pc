import React from "react";

export default (props: any) => {
  const { children, ...restProps } = props;
  return <div {...restProps}>{children}</div>;
};
