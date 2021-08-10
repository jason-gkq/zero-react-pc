import React from "react";

import { View, Text } from "@/zero/components";

export default (props) => {
  const { goTo, goBack, redirect } = props;
  return (
    <>
      <View style={{ width: "80%", margin: "10px auto", display: "flex" }}>
        <View
          style={{
            flex: 1,
            border: "solid 1px #000000",
            textAlign: "center",
            marginRight: "5px",
          }}
          onClick={redirect}
        >
          重定向
        </View>
        <View
          style={{
            flex: 1,
            border: "solid 1px #000000",
            textAlign: "center",
            marginRight: "5px",
          }}
          onClick={goTo}
        >
          goto
        </View>
        <View
          style={{
            flex: 1,
            border: "solid 1px #000000",
            textAlign: "center",
            marginRight: "5px",
          }}
          onClick={goBack}
        >
          goBack
        </View>
      </View>
    </>
  );
};
