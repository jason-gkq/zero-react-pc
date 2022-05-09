import React from "react";

export default React.memo(
  ({ children }: any) =>
    typeof children === "function" ? children() : children,
  () => true
);
