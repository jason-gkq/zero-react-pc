import { useContext, useCallback, useMemo } from "react";
import { ModalContext, showModal, hideModal } from "./ModalContext";

const modalCallbacks = {} as any;
export const useNiceModal = (modalId: string) => {
  const { state, dispatch }: any = useContext(ModalContext);

  const show = useCallback(
    (args?: any) => {
      return new Promise((resolve) => {
        modalCallbacks[modalId] = resolve;
        dispatch(showModal(modalId, args));
      });
    },
    [dispatch, modalId]
  );
  const resolve = useCallback(
    (args?: any) => {
      if (modalCallbacks[modalId]) {
        modalCallbacks[modalId](args);
        delete modalCallbacks[modalId];
      }
    },
    [modalId]
  );

  const hide = useCallback(
    (force?: boolean) => {
      dispatch(hideModal(modalId, force));
      delete modalCallbacks[modalId];
    },
    [dispatch, modalId]
  );

  const args = (state as any)[modalId];

  const hiding = (state as any).hiding && (state as any).hiding[modalId];

  return useMemo(
    () => ({ args, hiding, visible: !!args, show, hide, resolve }),
    [args, hide, show, resolve, hiding]
  );
};
