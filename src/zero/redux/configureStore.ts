import {
  createStore,
  combineReducers,
  applyMiddleware,
  Middleware,
  Dispatch,
  AnyAction,
  compose,
} from "redux";
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

export namespace StoreState {
  export type Enthusiasm = {
    languageName: string;
    enthusiasmLevel: number;
  };

  export type All = {
    enthusiasm: Enthusiasm;
  };
}

function createReducer(asyncReducers: any) {
  const rootReducer = enableBatching(
    combineReducers<StoreState.All>({
      ...staticReducers,
      ...asyncReducers,
    })
  );
  return (state: any, action: any) => {
    if (action.error) {
      return state;
    }
    return rootReducer(state, action);
  };
}

const sagaMiddleware = createSagaMiddleware();

const middlewares: Array<Middleware<{}, any, Dispatch<AnyAction>>> = [
  sagaMiddleware,
  thunkMiddleware,
];

if (!["prod", "pre"].includes((process as any).env.ENV)) {
  const loggerMiddleware: Middleware<
    {},
    any,
    Dispatch<AnyAction>
  > = createLogger();
  middlewares.push(loggerMiddleware);
}

const store: any = createStore(
  combineReducers(staticReducers),
  applyMiddleware(...middlewares)
);

// const store: any = configureStore({
//   reducer: combineReducers(staticReducers),
//   middleware: [...middlewares],
// });

sagaMiddleware.run(staticSagas);

store.asyncReducers = {};

export function injectAsyncReducer(name: string, asyncReducer: any) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}

export function removeAsyncReducer(name: string) {
  const asyncReducers = store.asyncReducers;
  if (!asyncReducers[name]) {
    return;
  }
  const state = store.getState();
  delete asyncReducers[name];
  delete state[name];
  store.replaceReducer(createReducer(asyncReducers));
}

// store.subscribe(() => console.log(store.getState()));

/* 引自@https://redux.js.org/usage/usage-with-typescript */
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store, sagaMiddleware, batchActions };
