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
      // rootMenus: [],
      menuItems: {},
      defaultOpenKeys: [],
      defaultSelectedKeys: [],
    };
    // this.generateMenus = this.generateMenus.bind(this);
    // this.generateMenuItems = this.generateMenuItems.bind(this);
  }

  componentDidMount() {
    const { path, configureMenu, menus } = this.props;
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
    // const rootMenus = this.generateMenus(menus);
    this.setState({ defaultOpenKeys, defaultSelectedKeys });
  }

  // generateMenuItems(e) {
  //   console.log(e);
  //   if (e.length <= 0) {
  //     return;
  //   }
  //   const key = e[e.length - 1];
  //   let { menuItems } = this.state;
  //   if (menuItems[key] && menuItems[key].length > 0) {
  //     return;
  //   }
  //   const { menus } = this.props;
  //   let items = [];
  //   for (let i in menus) {
  //     if (Number(menus[i]["key"]) == Number(key)) {
  //       items = generateMenuItems(menus[i]["children"], []);
  //       break;
  //     }
  //   }
  //   console.log(
  //     items,
  //     {
  //       [key]: items,
  //     },
  //     Object.assign(menuItems, {
  //       [key]: items,
  //     })
  //   );
  //   this.setState({
  //     menuItems: Object.assign(menuItems, {
  //       [key]: items,
  //     }),
  //   });
  // }

  // generateMenus(menus) {
  //   if (!Array.isArray(menus)) {
  //     return;
  //   }
  //   const { menuItems } = this.state;
  //   const menuList = menus.map((item) => {
  //     menuItems[item.key] = [];
  //     if (item.children && item.children.length > 0) {
  //       return (
  //         <SubMenu
  //           icon={
  //             <>{item.icon ? <MyIcon type='icon4Sdian' /> : <BarsOutlined />}</>
  //           }
  //           key={item.key}
  //           title={item.title}
  //           children={menuItems[item.key]}
  //         ></SubMenu>
  //       );
  //     } else {
  //       return (
  //         <Menu.Item link={item.link} key={item.key}>
  //           {item.title}
  //         </Menu.Item>
  //       );
  //     }
  //   });
  //   return menuList;
  // }

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
            // onOpenChange={this.generateMenuItems}
            // triggerSubMenuAction='click'
          >
            {menuItems}
            {/* {this.generateMenus(menus)} */}
            {/* {rootMenus} */}
          </Menu>
        </View>
      </Sider>
    );
  }
}
