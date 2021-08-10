import React from "react";

import { View, Text } from "@/zero/components";

export default (props) => {
  const { addVoucher, goTo, goBack, pageStatus } = props;
  return (
    <>
      <View>
        <View className='test-container'>
          <View onClick={addVoucher} className='container-div'>
            <Text>我是一个demo</Text>
          </View>
          <View onClick={goTo} className='container-div'>
            我是一个很多字div---{pageStatus}
          </View>
          <View onClick={goBack} className='container-div'>
            我是一个更多字而且第三个div
          </View>
        </View>
      </View>
    </>
  );
};
