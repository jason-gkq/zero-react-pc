import React from "react";

export default (props) => {
  const { children, ...restProps } = props;
  return <div {...restProps}>{children}</div>;
};
