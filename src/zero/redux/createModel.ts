import { createActions, handleActions } from "redux-actions";
import { takeEvery, takeLatest } from "redux-saga/effects";
import { createSelector, Selector } from "reselect";

import {
  injectAsyncReducer,
  removeAsyncReducer,
  sagaMiddleware,
} from "./configureStore";

import { globalActions, injectGlobalActions } from "./rootAction";
import { globalSelectors, injectGlobalSelectors } from "./rootSelector";

export const isObject = (obj: any) =>
  Object.prototype.toString.call(obj) === "[object Object]";

export const toUpperCaseStyle = (map: any) =>
  Object.entries(map).reduce((result: any, [key, val]) => {
    key = key.replace(/([A-Z])/g, "_$1").toUpperCase();
    if (isObject(val)) {
      val = toUpperCaseStyle(val);
    }
    result[key] = val;
    return result;
  }, {});

export const createActionsFromMap = (map: any, prefix = "") => {
  map = toUpperCaseStyle({
    initState: void 0,
    setState: void 0,
    ...map,
  });
  return createActions(map, { prefix });
};

// From: https://github.com/redux-utilities/redux-actions/blob/master/src/utils/flattenWhenNode.js
export const flatten = (
  map: any,
  partialFlatMap: any = {},
  partialFlatActionType = ""
) => {
  const connectNamespace = (type: string) =>
    partialFlatActionType ? `${partialFlatActionType}.${type}` : type;

  Object.keys(map).forEach((type) => {
    const nextNamespace = connectNamespace(type);
    const mapValue = map[type];

    if (isObject(mapValue)) {
      flatten(mapValue, partialFlatMap, nextNamespace);
    } else {
      partialFlatMap[nextNamespace] = mapValue;
    }
  });

  return partialFlatMap;
};

export const createReducerFromMap = (
  map: any,
  actions: any,
  initialState: any
) => {
  map = flatten({
    initState() {
      return initialState;
    },
    setState(state: any, { payload }: { payload: any }) {
      return {
        ...state,
        ...payload,
      };
    },
    ...map,
  });
  map = Object.entries(map).reduce((result: any, [key, val]) => {
    const creator = key
      .split(".")
      .reduce((actions, propKey) => actions[propKey], actions);
    if (!creator) {
      throw Error(`undefined action creator: ${key}`);
    }
    result[creator.toString()] = val;
    return result;
  }, {});

  return handleActions(map, initialState);
};

const toLocalSelectors = (selectors: { [key: string]: any }, getState: any) =>
  Object.entries(selectors).reduce(
    (result: any, [key, selector]) => {
      result[key] = createSelector(getState, selector);
      return result;
    },
    {
      getState,
    }
  );

const createSagaFromMap = (map: any, actions: any, selectors: any) => {
  map = flatten(map);
  map = Object.entries(map).map(([key, val]) => {
    let shouldTakeEvery = false;
    const actionType = key
      .split(".")
      .reduce((actions, propKey) => {
        if (propKey.startsWith("$")) {
          shouldTakeEvery = true;
          propKey = propKey.slice(1);
        }
        return actions[propKey];
      }, actions)
      .toString();
    return [actionType, val, shouldTakeEvery];
  });
  return function* () {
    for (let i = 0, len = map.length; i < len; i++) {
      const item = map[i];
      if (item[2]) {
        yield takeEvery(item[0], item[1], {
          $actions: actions,
          $selectors: selectors,
          $globalActions: globalActions,
          $globalSelectors: globalSelectors,
        });
      } else {
        yield takeLatest(item[0], item[1], {
          $actions: actions,
          $selectors: selectors,
          $globalActions: globalActions,
          $globalSelectors: globalSelectors,
        });
      }
    }
  };
};

// 填补actionMap
const fillActionMap = (actionMap: any, map: any) => {
  Object.keys(map).forEach((key) => {
    if (isObject(map[key])) {
      if (!actionMap[key]) {
        actionMap[key] = {};
      }
      fillActionMap(actionMap[key], map[key]);
    }
    if (!actionMap[key]) {
      actionMap[key] = void 0;
    }
  });
};

export default function createDucks({
  name,
  state = {},
  initialize = false,
  cache = true,
  isGlobal = true,
  actions: actionMap = {},
  reducers: reducerMap = {},
  sagas: sagaMap = {},
  selectors = {},
}: {
  name: string;
  state?: any;
  initialize?: boolean;
  cache?: boolean;
  isGlobal?: boolean;
  actions?: any;
  reducers?: any;
  sagas?: any;
  selectors?: { [key: string]: any };
}) {
  fillActionMap(actionMap, reducerMap);
  fillActionMap(actionMap, sagaMap);

  const sliceAction = createActionsFromMap(actionMap, name);

  // const defaultSelectors: any = {};
  // if (isGlobal) {
  //   defaultSelectors[`get${name.replace(/^\S/, (s) => s.toUpperCase())}`] = (
  //     state
  //   ) => state[name];
  // } else {
  //   defaultSelectors["getState"] = (state) => state[name];
  // }
  // const getState = (state: any) => state[name];

  const getInitState = (state: any) => state[name];
  const sliceSelector = toLocalSelectors(selectors, getInitState);
  let { pageStatus, appStatus, ...initState } = state;
  let sliceReducer = createReducerFromMap(reducerMap, sliceAction, initState);
  const sliceSaga = createSagaFromMap(sagaMap, sliceAction, sliceSelector);

  injectAsyncReducer(name, sliceReducer);
  let sagaTask: any = null;
  if (isGlobal) {
    injectGlobalActions(sliceAction, name);
    injectGlobalSelectors(sliceSelector, name);
    sagaTask = sagaMiddleware.run(sliceSaga);
  }

  return {
    name,
    initialize,
    cache,
    selectors: sliceSelector,
    actions: sliceAction,
    reducers: sliceReducer,
    removeReducer() {
      removeAsyncReducer(name);
      // if (__DEV__) {
      // 	console.log(`reducer of ${name} has been removed`);
      // }
    },
    _sagaTask: sagaTask,
    runSaga() {
      if (this._sagaTask) {
        return;
      }
      this._sagaTask = sagaMiddleware.run(sliceSaga);
    },
    cancelSaga() {
      if (!this._sagaTask) {
        return;
      }
      this._sagaTask.cancel();
      this._sagaTask = null;
      // if (__DEV__) {
      console.log(`saga of ${name} has been canceled`);
      // }
    },
  };
}
