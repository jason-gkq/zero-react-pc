import React from "react";
import { Button } from "antd";
import { View } from "../../index";
import { navigate } from "../../../api";
import "./index.less";

type IErrors = {
  [key: number]: {
    img: string;
    title: string;
    desc: string;
  };
};

const errors: IErrors = {
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
    desc: "抱歉，渲染错误，请刷新重试",
  },
  505: {
    img: "https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg",
    title: "500",
    desc: "抱歉，服务器出错了",
  },
};

type IExceptionProps = {
  code?: number;
  msg?: string;
  url?: string;
  onClick?: Function;
};
/* 异常页面 */
export default <P extends IExceptionProps>(props: P) => {
  const { code = 500, msg, url, onClick } = props;
  let item = errors[code] || {
    img: "https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg",
    title: code,
    desc: msg,
  };
  if (msg) {
    item.desc = msg;
  }
  return (
    <View className='ad-exception'>
      <View className='img-block'>
        <View className='img' style={{ backgroundImage: `url(${item.img})` }} />
      </View>
      <View className='cont'>
        <View className='title'>{item.title}</View>
        <View className='actions'>
          <View className='desc'>{item.desc}</View>
          <Button
            onClick={() => {
              (onClick && onClick()) || navigate.redirect(url);
            }}
            type='primary'
          >
            返回首页
          </Button>
        </View>
      </View>
    </View>
  );
};
