import { createActions } from "redux-actions";

const staticActions = {
  SYSTEM: {
    SET_SYSTEM: void 0,
    INIT_SYSTEM: void 0,
  },
  ENV: {
    SET_ENV: void 0,
    INIT_ENV: void 0,
    SET_APP_CODE: void 0,
    SET_SERVICE_URL: void 0,
    CHANGE_THEME: void 0,
    INJECT_THEMES: void 0,
  },
  ROUTE: {
    SET_ROUTE: void 0,
    CURRENT_PAGE: void 0,
  },
  NAVIGATE: {
    GO_TO: void 0,
    GO_BACK: void 0,
    RE_LAUNCH: void 0,
    REDIRECT: void 0,
    REPLACE: void 0,
  },
  USER: {
    SET_USER: void 0,
    LOGIN: void 0,
    LOGOUT: void 0,
  },
  SHOP: {
    SET_SHOP: void 0,
  },
  SHARE: void 0,
  TEST: void 0,
};

export const globalActions = createActions(staticActions, {
  // prefix: "global",
  // namespace: ".",
});

export default globalActions;

export function injectGlobalActions(actions, name = null) {
  if (name) {
    globalActions[name] = actions;
    return;
  }
  if (actions) {
    Object.keys(actions).forEach((key) => {
      if (!globalActions[key]) {
        globalActions[key] = actions[key];
      }
    });
  }
}
