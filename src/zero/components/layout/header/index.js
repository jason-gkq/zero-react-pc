import React, { Component } from "react";
import { connect } from "react-redux";
import "./index.less";
import { globalSelectors, globalActions } from "../../../redux";
import { View, Text, Avatar, Popover, Modal, Divider } from "../../basic";
import { Layout } from "antd";
const { Header } = Layout;
const { confirm } = Modal;
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExclamationCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import StoreList from "./tools/ChangeStore";
import RoleList from "./tools/RoleList";

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
      logOutAction() {
        dispatch(globalActions.user.logout());
      },
      cleanStorageAction() {
        confirm({
          title: "是否确定清除系统缓存",
          icon: <ExclamationCircleOutlined />,
          content: "该操作将会清除系统缓存信息",
          okText: "确定",
          cancelText: "取消",
          okType: "danger",
          onOk() {
            console.log("OK");
          },
          onCancel() {
            console.log("Cancel");
          },
        });
      },
      goToDownloadCenter() {},
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
      logOutAction,
      cleanStorageAction,
      goToDownloadCenter,
    } = this.props;

    const breadcrumb = configureMenu.getBreadcrumb(path);
    return (
      <Header
        className={
          collapsed ? "main-header main-header-trigger" : "main-header"
        }
      >
        <View className="main-header-left">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "main-header-tools main-header-collapsed",
              onClick: onCollapse,
            }
          )}
          <View className="main-header-tools main-header-breadcrumb">
            <Text>{breadcrumb}</Text>
          </View>
        </View>
        <View className="main-header-right">
          <StoreList
            shopList={shopList}
            shopInfo={shopInfo}
            changeShop={changeShop}
          />
          <View className="hand download" onClick={goToDownloadCenter}>
            下载中心 <DownloadOutlined />
          </View>
          <Divider type="vertical" />
          {userInfo ? (
            <View className="main-header-tools main-header-userinfo">
              <Popover
                // visible={true}
                placement="bottomRight"
                content={
                  <RoleList
                    shopInfo={shopInfo}
                    logOutAction={logOutAction}
                    cleanStorage={cleanStorageAction}
                  />
                }
              >
                <View>
                  <Text className="user-real-name">
                    {userInfo.realName || ""}
                  </Text>
                  <Avatar
                    className="user-avater"
                    src={userInfo.faceImageUrl || ""}
                  />
                </View>
              </Popover>
            </View>
          ) : (
            ""
          )}
        </View>
      </Header>
    );
  }
}
