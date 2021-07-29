import React from "react";

const defaultStyle = {
  display: "flex",
  flex: 1,
};

export default (props) => {
  const { children, style, ...restProps } = props;
  return (
    <div {...restProps} style={{ ...defaultStyle, ...style }}>
      {children}
    </div>
  );
};
