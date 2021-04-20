import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import reducer from './rootReducer';
import sagas from './rootSaga';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist'; //不要使用persistCombineReducers，已作废
import storage from 'redux-persist/lib/storage';
import { batchActions, enableBatching } from 'redux-batched-actions';

const persistConfig = {
	key: 'root',
	storage,
	throttle: 1000,
	timeout: 8000,
	// debug: __DEV__,
	whitelist: [],
};

function createReducer(asyncReducers) {
	const rootReducer = enableBatching(
		persistReducer(persistConfig, {
			...reducer,
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

const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

let store = createStore(
	persistReducer(persistConfig, reducer),
	applyMiddleware(sagaMiddleware, thunkMiddleware, loggerMiddleware)
);
// sagaMiddleware.run(sagas);

const persistor = persistStore(store, null, () => {
	sagaMiddleware.run(sagas);
});

store.asyncReducers = {};

let persistTimer = null;

const replaceReducer = (reducer) => {
	store.replaceReducer(createReducer(reducer));
	// 修复replaceReducer后persist被中断
	if (persistTimer) {
		clearTimeout(persistTimer);
		persistTimer = null;
	}
	persistTimer = setTimeout(() => {
		persistor.persist();
		persistTimer = null;
	}, 500);
};

export function injectAsyncReducer(store, name, asyncReducer) {
	store.asyncReducers[name] = asyncReducer;
	replaceReducer(store.asyncReducers);
}

export function removeAsyncReducer(store, name) {
	const asyncReducers = store.asyncReducers;
	if (!asyncReducers[name]) {
		return;
	}
	const state = store.getState();
	delete asyncReducers[name];
	delete state[name];
	replaceReducer(asyncReducers);
}

export { store, sagaMiddleware, persistor, batchActions };
