import React from "react";
import { Button, View, Image, Text, Modal } from "@/zero/components";
import logo from "@/assets/lcb-logo/logo-menu.png";

export default (props) => {
  const { isModalVisible, handleOk, handleCancel, showModal } = props;
  return (
    <View style={{ width: "30%", margin: "10px auto" }}>
      <Button onClick={showModal}>弹窗</Button>
      <Modal
        title='弹窗'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <View>
          <Text>弹窗</Text>
          <Image src={logo} />
        </View>
      </Modal>
    </View>
  );
};
