import React from "react";
import { Button, View, Image, Text, Modal } from "@/zero/components";

import Logo from "@/assets/lcb-logo/logo-menu.png";

export default (props) => {
  return (
    <>
      <View style={{ width: "30%", margin: "20px auto" }}>
        <Button>Button</Button>
        <Button type='primary'>Button</Button>
      </View>
      <View style={{ width: "30%", margin: "20px auto" }}>
        <Text>
          这里写文字这里写文字这里写文字这里写文字这里写文字这里写文字这里写文字这里写文字这里写文字
        </Text>
      </View>
      <View style={{ width: "30%", margin: "20px auto" }}>
        <View>
          <Text>本地图片</Text>
        </View>
        <Image
          style={{
            backgroundColor: "#002140",
          }}
          src={Logo}
        />
        <View>
          <Text>在线图片</Text>
        </View>
        <Image src='https://lcbqiniu.lechebangstatic.com//icon/1f3ed3cf-9edc-42d2-8e21-c3ee60de5f39.jpg' />
      </View>
    </>
  );
};
