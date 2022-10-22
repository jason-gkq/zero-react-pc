import React from "react";
import { Button } from "antd";
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
    desc: "抱歉，服务器出错了",
  },
  505: {
    img: "https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg",
    title: "505",
    desc: "抱歉，渲染错误，请刷新重试",
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
    <div className="ad-exception">
      <div className="img-block">
        <div className="img" style={{ backgroundImage: `url(${item.img})` }} />
      </div>
      <div className="cont">
        <div className="title">{item.title}</div>
        <div className="actions">
          <div className="desc">{item.desc}</div>
          <Button
            onClick={() => {
              (onClick && onClick()) || navigate.redirect(url);
            }}
            type="primary"
          >
            返回
          </Button>
        </div>
      </div>
    </div>
  );
};
