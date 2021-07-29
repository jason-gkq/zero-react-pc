import React from "react";
import { Text, View, Divider } from "../../../basic";

import { Menu, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default (props) => {
  const { shopList, shopInfo: currentShopInfo, changeShop } = props;
  if (!currentShopInfo || !shopList || Object.keys(shopList).length <= 1) {
    return null;
  }
  const menuItem = Object.values(shopList).map((item) => {
    if (
      item.groupType == currentShopInfo.groupType &&
      item.groupId == currentShopInfo.groupId
    ) {
      return;
    }
    const key = `${item.groupType}|${item.groupId}`;
    return (
      <Menu.Item
        key={key}
        shopinfo={item}
        style={{
          fontSize: "12px",
        }}
      >
        {item.groupName}
      </Menu.Item>
    );
  });
  const menu = (
    <Menu
      style={{
        maxHeight: "500px",
        overflowY: "auto",
      }}
      onClick={changeShop}
    >
      {menuItem}
    </Menu>
  );

  return (
    <>
      <View className='main-header-tools main-header-download'>
        <Space wrap>
          <Dropdown overlay={menu}>
            <Text>
              {currentShopInfo.groupName} <DownOutlined />
            </Text>
          </Dropdown>
        </Space>
      </View>
      <Divider
        style={{
          height: "16px",
          margin: "16px 0",
        }}
        type='vertical'
      />
    </>
  );
};
