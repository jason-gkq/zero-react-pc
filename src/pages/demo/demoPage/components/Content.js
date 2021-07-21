import React from "react";

import china from "@/assets/lcb-logo/logo-collapsed.png";
import logo from "@/assets/lcb-logo/logo-menu.png";

import { Button, View, Image } from "@/common/components";

export default (props) => {
  const { addVoucher, goTo, goBack, pageStatus } = props;
  return (
    <>
      <Button>4444</Button>
      <View>
        <View className='test-container'>
          <View onClick={addVoucher} className='container-div'>
            我是一个demo
            <Image src={china} />
            <Image src={logo} />
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
