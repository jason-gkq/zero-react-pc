import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.less";
import { globalSelectors, globalActions } from "../../../redux";
import { View, Text, Avatar, Divider } from "../../basic";
import { Layout } from "antd";
const { Header } = Layout;
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import StoreList from "./tools/chengeStore";

class HeaderErrorBoundary extends Component {
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
    //   return <Header className='main-header'>回首页</Header>;
    // }
    return this.props.children;
  }
}

@connect(
  (state) => {
    const { currentPage = {} } = globalSelectors.getRoute(state);
    const { userInfo } = globalSelectors.getUser(state);
    const { shopInfo, shopList } = globalSelectors.getShop(state);
    const { path } = currentPage;
    return { path, userInfo, shopInfo, shopList };
  },
  (dispatch) => {
    return {
      changeShop({ item }) {
        dispatch(
          globalActions.shop.changeShop({ shopInfo: item.props.shopinfo })
        );
      },
    };
  }
)
export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onCollapse,
      collapsed,
      path,
      configureMenu,
      userInfo,
      shopInfo,
      shopList,
      changeShop,
    } = this.props;
    const breadcrumb = configureMenu.getBreadcrumb(path);
    return (
      <HeaderErrorBoundary>
        <Header
          className={
            collapsed ? "main-header main-header-trigger" : "main-header"
          }
        >
          <View className='main-header-left'>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "main-header-tools main-header-collapsed",
                onClick: onCollapse,
              }
            )}
            <View className='main-header-tools main-header-breadcrumb'>
              <Text>{breadcrumb}</Text>
            </View>
          </View>
          <View className='main-header-right'>
            <StoreList
              shopList={shopList}
              shopInfo={shopInfo}
              changeShop={changeShop}
            />
            {userInfo ? (
              <View className='main-header-tools main-header-userinfo'>
                <Text>{userInfo.realName || ""}</Text>
                <Avatar src={userInfo.faceImageUrl || ""} />
              </View>
            ) : (
              ""
            )}
          </View>
        </Header>
      </HeaderErrorBoundary>
    );
  }
}
