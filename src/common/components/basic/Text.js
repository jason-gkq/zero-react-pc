import React from "react";

export default (props) => {
  const { children, ...restProps } = props;
  return <span {...restProps}>{children}</span>;
};
