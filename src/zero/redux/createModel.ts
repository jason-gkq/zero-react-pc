import { createActions, handleActions } from "redux-actions";
import { takeEvery, takeLatest } from "redux-saga/effects";
import { createSelector, Selector } from "reselect";

import {
  injectAsyncReducer,
  removeAsyncReducer,
  sagaMiddleware,
  store,
} from "./configureStore";

import { globalActions, injectGlobalActions } from "./rootAction";
import { globalSelectors, injectGlobalSelectors } from "./rootSelector";

const isObject = (obj: any) =>
  Object.prototype.toString.call(obj) === "[object Object]";

const isFunction = (o: any) => typeof o === "function";

const toUpperCaseStyle = (map: any) =>
  Object.entries(map).reduce((result: any, [key, val]) => {
    key = key.replace(/([A-Z])/g, "_$1").toUpperCase();
    if (isObject(val)) {
      val = toUpperCaseStyle(val);
    }
    result[key] = val;
    return result;
  }, {});

const createActionsFromMap = (map: any, prefix = "") => {
  map = toUpperCaseStyle({
    initState: void 0,
    setState: void 0,
    ...map,
  });
  return createActions(map, { prefix });
};

// From: https://github.com/redux-utilities/redux-actions/blob/master/src/utils/flattenWhenNode.js
const flatten = (
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

const createReducerFromMap = (map: any, actions: any, initialState: any) => {
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

function runSubscription(subs: any, actions: any) {
  const funcs = [];
  const nonFuncs = [];
  for (const key in subs) {
    if (Object.prototype.hasOwnProperty.call(subs, key)) {
      const sub = subs[key];
      const unlistener = sub({
        dispatch: store.dispatch,
        $actions: actions,
      });
      if (isFunction(unlistener)) {
        funcs.push(unlistener);
      } else {
        nonFuncs.push(key);
      }
    }
  }
  return { funcs, nonFuncs };
}
// const unlisteners: any = {};
export default function createDucks({
  namespace,
  state = {},
  initialize = false,
  isGlobal = true,
  actions: actionMap = {},
  reducers: reducerMap = {},
  effects: sagaMap = {},
  selectors = {},
  subscriptions,
}: {
  namespace: string;
  state?: any;
  initialize?: boolean;
  isGlobal?: boolean;
  actions?: any;
  reducers?: any;
  effects?: any;
  selectors?: { [key: string]: any };
  subscriptions?: any;
}) {
  fillActionMap(actionMap, reducerMap);
  fillActionMap(actionMap, sagaMap);

  const sliceAction = createActionsFromMap(actionMap, namespace);

  // const defaultSelectors: any = {};
  // if (isGlobal) {
  //   defaultSelectors[`get${name.replace(/^\S/, (s) => s.toUpperCase())}`] = (
  //     state
  //   ) => state[name];
  // } else {
  //   defaultSelectors["getState"] = (state) => state[name];
  // }
  // const getState = (state: any) => state[name];

  const getInitState = (state: any) => state[namespace];
  const sliceSelector = toLocalSelectors(selectors, getInitState);
  let { pageStatus, appStatus, ...initState } = state;
  let sliceReducer = createReducerFromMap(reducerMap, sliceAction, initState);
  const sliceSaga = createSagaFromMap(sagaMap, sliceAction, sliceSelector);

  injectAsyncReducer(namespace, sliceReducer);
  let sagaTask: any = null;

  if (isGlobal) {
    injectGlobalActions(sliceAction, namespace);
    injectGlobalSelectors(sliceSelector, namespace);
  }
  sagaTask = sagaMiddleware.run(sliceSaga);

  const resModal = {
    namespace,
    initialize,
    selectors: sliceSelector,
    actions: sliceAction,
    reducers: sliceReducer,
    removeReducer() {
      removeAsyncReducer(namespace);
      if (process.env.NODE_ENV === "development") {
        console.log(`reducer of ${namespace} has been removed`);
      }
    },
    _sagaTask: sagaTask,
    runSaga() {
      if (this._sagaTask) {
        return;
      }
      this._sagaTask = sagaMiddleware.run(sliceSaga);
      if (process.env.NODE_ENV === "development") {
        console.log(`saga of ${namespace} has been runned`);
      }
    },
    cancelSaga() {
      if (!this._sagaTask) {
        return;
      }
      this._sagaTask.cancel();
      this._sagaTask = null;
      if (process.env.NODE_ENV === "development") {
        console.log(`saga of ${namespace} has been canceled`);
      }
    },
  };

  if (subscriptions) {
    //unlisteners[namespace] =
    runSubscription(subscriptions, resModal.actions);
  }

  return resModal;
}
