import { handleActions } from "redux-actions";
import staticActions from "./rootAction";

const system = handleActions(
  {
    /**
     *
     * @param {*} state
     * @param {*} param1
     * @returns
     */
    [(staticActions as any).system.setSystem](
      state: any,
      { payload }: { payload: any }
    ) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  {}
);

const env = handleActions(
  {
    /**
     * 初始化信息：
     * __clientId
     * parentSessionId
     * sessionId
     * onLunchTime
     * env
     *
     *
     * platformType
     * onLunchOptions
     * onShowOptions
     * appCode
     * utmSource
     * serverTime
     * version
     * groupId
     * groupType
     * token
     */
    [(staticActions as any).env.setEnv](
      state: any,
      { payload }: { payload: any }
    ) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  {}
);

const page = handleActions(
  {
    [(staticActions as any).page.currentPage](state, { payload }) {
      return {
        ...state,
        currentPage: { ...payload },
      };
    },
  },
  {}
);

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

export default {
  system,
  env,
  page,
  modalReducer,
};
