import React from "react";
import { useNiceModal } from "./useNiceModal";
import { Modal } from "antd";
import { default as niceConfirm } from "../NiceConfirm";

type IParams = any;

function NiceModal({ id, children, ...rest }: IParams) {
  const modal = useNiceModal(id);

  return (
    <Modal
      onCancel={() => modal.hide()}
      onOk={() => modal.hide()}
      afterClose={() => modal.hide(true)}
      open={!modal.hiding}
      okText="确定"
      cancelText="取消"
      {...rest}
    >
      {children}
    </Modal>
  );
}

export const createNiceModal = (modalId: string, Comp: any) => {
  return (props: any) => {
    const { visible, args } = useNiceModal(modalId);
    if (!visible) return null;
    return <Comp {...args} {...props} />;
  };
};

NiceModal.create = createNiceModal;
NiceModal.useNiceModal = useNiceModal;
NiceModal.niceConfirm = niceConfirm;

export default NiceModal;
