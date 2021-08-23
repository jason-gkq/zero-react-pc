import React from "react";
import { View, Button } from "../../index";
import "./index.less";

const item = {
  403: {
    img: "https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg",
    title: "403",
    desc: "抱歉，你无权访问该页面",
  },
  404: {
    img: "https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg",
    title: "404",
    desc: "抱歉，你访问的页面不存在",
  },
  500: {
    img: "https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg",
    title: "500",
    desc: "抱歉，服务器出错了",
  },
};

/* 异常页面 */
export default (props) => {
  const { type = 404 } = props;
  return (
    <View className="ad-exception">
      <View className="img-block">
        <View
          className="img"
          style={{ backgroundImage: `url(${item[type].img})` }}
        />
      </View>
      <View className="cont">
        <View className="title">{item[type].title}</View>
        <View className="actions">
          <View className="desc">{item[type].desc}</View>
          <Button href="/backend/index" type="primary">返回首页</Button>
        </View>
      </View>
    </View>
  );
};
