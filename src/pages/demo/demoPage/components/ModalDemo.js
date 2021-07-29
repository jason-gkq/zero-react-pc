import React from "react";
import { Button, View, Image, Text, Modal } from "@/zero/components";
import logo from "@/assets/lcb-logo/logo-menu.png";

export default (props) => {
  const { isModalVisible, handleOk, handleCancel, showModal } = props;
  return (
    <>
      <Button onClick={showModal}>4444</Button>
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
    </>
  );
};
