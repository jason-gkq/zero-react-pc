import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

import {
  batchActions,
  enableBatching,
  batchDispatchMiddleware,
} from "redux-batched-actions";
import createSagaMiddleware from "redux-saga";

import staticReducers from "./rootReducer";
import staticSagas from "./rootSaga";

function createReducer(asyncReducers) {
  const rootReducer = enableBatching(
    combineReducers({
      ...staticReducers,
      ...asyncReducers,
    })
  );
  return (state, action) => {
    if (action.error) {
      return state;
    }
    return rootReducer(state, action);
  };
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, thunkMiddleware];

if (!["prod", "pre"].includes(process.env.ENV)) {
  const loggerMiddleware = createLogger();
  middlewares.push(loggerMiddleware);
}

const store = createStore(
  combineReducers(staticReducers),
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(staticSagas);

store.asyncReducers = {};

export function injectAsyncReducer(name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}

export function removeAsyncReducer(name) {
  const asyncReducers = store.asyncReducers;
  if (!asyncReducers[name]) {
    return;
  }
  const state = store.getState();
  delete asyncReducers[name];
  delete state[name];
  store.replaceReducer(createReducer(asyncReducers));
}

store.subscribe(function (...data) {
  // console.log(
  //   "store_0 has been updated. Latest store state:",
  //   data,
  //   store.getState()
  // );
  // 在这里更新你的视图
});

export { store, sagaMiddleware, batchActions };
