import React from "react";
import { Text, View, Divider, Menu } from "../../../basic";
import "../index.less";
import { LogoutOutlined, WarningOutlined } from "@ant-design/icons";

export default ({ shopInfo, logOutAction, cleanStorage }) => {
  return (
    <View style={{ width: 160 }}>
      <View className="role-list-area">
        {shopInfo.roles.map((role, index) => {
          return (
            <View key={index} className="role-name">
              <Text>{role.roleName}</Text>
            </View>
          );
        })}
      </View>
      <Divider className="divider" />
      <View className="menu-list-area" onClick={cleanStorage}>
        <WarningOutlined />
        <Text className="margin-l-5">清除缓存</Text>
      </View>
      <View className="menu-list-area" onClick={logOutAction}>
        <LogoutOutlined />
        <Text className="margin-l-5">退出登录</Text>
      </View>
    </View>
  );
};
