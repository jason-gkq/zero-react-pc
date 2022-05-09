import React from "react";
import { Modal } from "antd";
import { useNiceModal } from "./useNiceModal";
import { default as niceConfirm } from "../NiceConfirm";

type IParams = any;

function NiceModal({ id, children, ...rest }: IParams) {
  const modal = useNiceModal(id);
  return (
    <Modal
      onCancel={() => modal.hide()}
      onOk={() => modal.hide()}
      afterClose={() => modal.hide(true)}
      visible={!modal.hiding}
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
