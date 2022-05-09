import { useAppDispatch } from "../../../api";
import { useAppSelector } from "../../../api";
import { useCallback, useMemo } from "react";
// import { showModal, hideModal } from "../../redux/rootAction";

export function showModal(modalId: string, args: any) {
  return {
    type: "nice-modal/show",
    payload: {
      modalId,
      args,
    },
  };
}

export function hideModal(modalId: string, force: any) {
  return {
    type: "nice-modal/hide",
    payload: {
      modalId,
      force,
    },
  };
}

const modalCallbacks = {} as any;
export const useNiceModal = (modalId: string) => {
  const dispatch = useAppDispatch();
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

  const args = useAppSelector((s: any) => s["modalReducer"][modalId]);
  const hiding = useAppSelector((s: any) => {
    return s["modalReducer"].hiding[modalId];
  });

  return useMemo(
    () => ({ args, hiding, visible: !!args, show, hide, resolve }),
    [args, hide, show, resolve, hiding]
  );
};
