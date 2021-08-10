import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.less";
import { globalSelectors, globalActions } from "../../../redux";
import { View, Image } from "../../basic";
import Logo from "@/assets/lcb-logo/logo-menu.png";
import logoCollapsed from "@/assets/lcb-logo/logo-collapsed.png";
import { Layout, Menu } from "antd";
import { BarsOutlined, createFromIconfontCN } from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

const MyIcon = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1810562_ex0jixy1ib.js", // 在 iconfont.cn 上生成
});
// const arr = [];
const generateMenuItems = (menus, rootMenuList) => {
  if (!Array.isArray(menus)) {
    return;
  }
  const menuList = menus.map((item) => {
    if (item.children && item.children.length > 0) {
      if (rootMenuList.includes(item.key)) {
        return (
          <SubMenu
            icon={
              <>{item.icon ? <MyIcon type='icon4Sdian' /> : <BarsOutlined />}</>
            }
            key={item.key}
            title={item.title}
          >
            {generateMenuItems(item.children, [])}
          </SubMenu>
        );
      } else {
        return (
          <SubMenu key={item.key} title={item.title}>
            {generateMenuItems(item.children, [])}
          </SubMenu>
        );
      }
    } else {
      // if (
      //   !item.link.startsWith("/saas/") &&
      //   !item.link.startsWith("/common/") &&
      //   !item.link.startsWith("/supply/") &&
      //   !item.link.startsWith("/fixedprice/") &&
      //   !item.link.startsWith("/rhd/")
      // ) {
      //   arr.push(item.link);
      // }
      return (
        <Menu.Item link={item.link} key={item.key}>
          {item.title}
        </Menu.Item>
      );
    }
  });
  return menuList;
};

const generateMenus = (menus) => {
  if (!Array.isArray(menus)) {
    return;
  }
  const rootMenuList = menus.map((item) => {
    return item.key;
  });
  return generateMenuItems(menus, rootMenuList);
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
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth='64'
        className='sider-root'
        theme='light'
      >
        <View className='sider-logo'>
          <Image preview={false} src={collapsed ? logoCollapsed : Logo} />
        </View>
        <View className='sider-menu'>
          <Menu
            theme='light'
            mode='inline'
            defaultOpenKeys={defaultOpenKeys}
            defaultSelectedKeys={defaultSelectedKeys}
            onClick={goTo}
          >
            {menuItems}
          </Menu>
        </View>
      </Sider>
    );
  }
}
