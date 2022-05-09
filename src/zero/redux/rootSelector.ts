import { createSelector } from "reselect";

export const getState = (state: any) => state || {};

export const getEnv = (state: any): any => state.env || {};

export const getSystem = (state: any) => state.system || {};

export const globalSelectors: any = {
  getState,
  getEnv,
  getSystem,
};

export function injectGlobalSelectors(selectors: any, name?: string) {
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
