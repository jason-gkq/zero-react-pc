import React from "react";

export default (props) => {
  const { children, ...data } = props;
  return <div {...data}>{children}</div>;
};
