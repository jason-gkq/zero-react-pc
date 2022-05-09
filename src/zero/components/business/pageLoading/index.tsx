import React from "react";
import { Spin } from "antd";
import "./index.less";

export default (props?: any) => {
  return (
    <div className='page-loading'>
      <Spin size='large' className='page-loading-spin' />
    </div>
  );
};
