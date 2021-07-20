import React from "react";

const defaultStyle = {
  color: "#333",
  fontWeight: "300",
  fontFamily: "PingFang-SC", // 安卓：fontFamily: 'Vani'
};

export default (props) => {
  const { children, style, ...data } = props;
  return (
    <span style={{ ...defaultStyle, ...style }} {...data}>
      {children}
    </span>
  );
};
