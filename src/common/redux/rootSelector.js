import { createSelector } from "reselect";

export const getState = (state) => state || {};

export const getEnv = (state) => state.env || {};

export const getSystem = (state) => state.system || {};

export const getRoute = (state) => state.route || {};

export const getUser = (state) => state.user || {};

export const globalSelectors = {
  getState,
  getEnv,
  getSystem,
  getRoute,
  getUser,
};

export function injectGlobalSelectors(selectors) {
  Object.assign(globalSelectors, selectors);
}

export default globalSelectors;
