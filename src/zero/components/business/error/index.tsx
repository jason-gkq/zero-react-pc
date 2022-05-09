import React from "react";
import { View, Text } from "../../basic";

type IErrorProps = {
  msg: string;
};

export default <P extends IErrorProps>(props: P) => {
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
