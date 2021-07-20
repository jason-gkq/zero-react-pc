import React from "react";

const defaultStyle = {
  display: "flex",
  flex: 1,
};

export default (props) => {
  const { children, style, ...data } = props;
  return (
    <div {...data} style={{ ...defaultStyle, ...style }}>
      {children}
    </div>
  );
};
