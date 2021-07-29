import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.less";
import { globalSelectors, globalActions } from "../../../redux";

import { View, Image } from "../../basic";

import Logo from "@/assets/lcb-logo/logo-menu.png";
import logoCollapsed from "@/assets/lcb-logo/logo-collapsed.png";

import { Layout, Menu } from "antd";

import { AppstoreOutlined, PayCircleOutlined } from "@ant-design/icons";

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
    // if (this.state.hasError) {
    //   return "";
    // }
    return this.props.children;
  }
}

const generateMenus = (menus) => {
  if (!Array.isArray(menus)) {
    return;
  }
  const menuList = menus.map((item) => {
    if (item.children && item.children.length > 0) {
      return (
        <SubMenu
          icon={item.icon ? <PayCircleOutlined /> : null}
          key={item.key}
          title={item.title}
        >
          {generateMenus(item.children)}
        </SubMenu>
      );
    } else {
      return (
        <Menu.Item link={item.link} key={item.key}>
          {item.title}
        </Menu.Item>
      );
    }
  });
  return menuList;
};

@connect(
  (state) => {
    const { currentPage = {}, menus } = globalSelectors.getRoute(state);
    const { path } = currentPage;
    return { path, menus };
  },
  (dispatch) => {
    return {
      goTo({ item }) {
        dispatch(globalActions.navigate.goTo({ url: item.props.link }));
      },
    };
  }
)
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
      defaultOpenKeys: [],
      defaultSelectedKeys: [],
    };
  }

  componentDidMount() {
    const { path, configureMenu } = this.props;
    const keys = configureMenu.getSelectKeys(path);
    let defaultOpenKeys = [];
    let defaultSelectedKeys = [];
    if (keys && keys.length > 2) {
      defaultOpenKeys = keys.slice(0, keys.length - 1);
      defaultSelectedKeys = keys.slice(keys.length - 1, keys.length);
    } else {
      defaultOpenKeys = keys;
      defaultSelectedKeys = keys;
    }
    this.setState({ defaultOpenKeys, defaultSelectedKeys });
  }

  render() {
    const { collapsed, goTo, menus } = this.props;
    const { defaultSelectedKeys, defaultOpenKeys } = this.state;
    const menuItems = generateMenus(menus);
    return (
      <SiderErrorBoundary>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth='64'
          className='sider-root'
        >
          <View className='sider-logo'>
            <Image preview={false} src={collapsed ? logoCollapsed : Logo} />
          </View>
          <View className='sider-menu'>
            <Menu
              theme='dark'
              mode='inline'
              defaultOpenKeys={defaultOpenKeys}
              defaultSelectedKeys={defaultSelectedKeys}
              onClick={goTo}
            >
              {menuItems}
            </Menu>
          </View>
        </Sider>
      </SiderErrorBoundary>
    );
  }
}
