import React from "react";
import { Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default (props: any) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const { children, msg, ...restProps } = props;
  return (
    <Space size="middle">
      {!msg && !children ? (
        <Spin indicator={antIcon} {...restProps} />
      ) : children ? (
        <Spin indicator={antIcon} {...restProps}>
          {children}
        </Spin>
      ) : (
        <Spin indicator={antIcon} {...restProps}>
          <span>{msg}</span>
        </Spin>
      )}
    </Space>
  );
};
