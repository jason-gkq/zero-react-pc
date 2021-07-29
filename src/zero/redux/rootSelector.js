import { createSelector } from "reselect";

export const getState = (state) => state || {};

export const getEnv = (state) => state.env || {};

export const getSystem = (state) => state.system || {};

export const getRoute = (state) => state.route || {};

export const getUser = (state) => state.user || {};

export const getShop = (state) => state.shop || {};

export const globalSelectors = {
  getState,
  getEnv,
  getSystem,
  getRoute,
  getUser,
  getShop,
};

export function injectGlobalSelectors(selectors, name = null) {
  if (name) {
    globalSelectors[name] = selectors;
    return;
  }
  if (selectors) {
    Object.keys(selectors).forEach((key) => {
      if (!globalSelectors[key]) {
        globalSelectors[key] = selectors[key];
      }
    });
  }
}

export default globalSelectors;
