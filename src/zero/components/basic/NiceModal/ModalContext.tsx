import React, { useReducer } from "react";

export const ModalContext = React.createContext({});
ModalContext.displayName = "ModalContext";

const modalReducer = (state = { hiding: {} }, action: any) => {
  switch (action.type) {
    case "nice-modal/show":
      return {
        ...state,
        [action.payload.modalId]: action.payload.args || true,
        hiding: {
          ...state.hiding,
          [action.payload.modalId]: false,
        },
      };
    case "nice-modal/hide":
      return action.payload.force
        ? {
            ...state,
            [action.payload.modalId]: false,
            hiding: { [action.payload.modalId]: false },
          }
        : { ...state, hiding: { [action.payload.modalId]: true } };
    default:
      return state;
  }
};

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

export default (props: any) => {
  const { children } = props;
  const [state, dispatch] = useReducer(modalReducer, { hiding: {} });
  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};
