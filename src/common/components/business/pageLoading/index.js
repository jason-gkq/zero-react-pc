import React from "react";
import { View, Spin } from "../../basic";
import "./index.less";

export default (props) => {
  return (
    <View className='page-loading'>
      <Spin size='large' className='page-loading-spin' />
    </View>
  );
};
