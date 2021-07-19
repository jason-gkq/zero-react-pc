import React, { Component } from "react";
import "./index.less";

import { Layout, Menu } from "antd";

const { SubMenu } = Menu;
const { Sider } = Layout;

class SiderErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // this.setState({
    //   error,
    //   errorInfo,
    // });
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return "";
    }
    return this.props.children;
  }
}

const cMenus = (menus) => {
  if (!Array.isArray(menus)) {
    return;
  }
  const menuList = menus.map((item) => {
    if (item.children && item.children.length > 0) {
      return (
        <SubMenu key={item.key} title={item.title}>
          {cMenus(item.children)}
        </SubMenu>
      );
    } else {
      return <Menu.Item key={item.key}>{item.title}</Menu.Item>;
    }
  });
  return menuList;
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "redTab",
      hidden: false,
    };
  }

  render() {
    const { menus } = this.props;
    const menuItems = cMenus(menus);
    return (
      <SiderErrorBoundary>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <div className='logo' />
          <Menu
            theme='dark'
            mode='inline'
            // openKeys={["755"]}
            defaultSelectedKeys={["828"]}
          >
            {menuItems}
          </Menu>
        </Sider>
      </SiderErrorBoundary>
    );
  }
}
