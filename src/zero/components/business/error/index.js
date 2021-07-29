import React from "react";
import { View, Text } from "../../basic";

export default (props) => {
  const { msg = "网络异常，请刷新重试" } = props;
  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: "1",
          textAlign: "center",
        }}
      >
        <Text>{msg}</Text>
      </View>
    </View>
  );
};
