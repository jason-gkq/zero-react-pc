import { createActions, handleActions } from 'redux-actions';
import { injectAsyncReducer, removeAsyncReducer, sagaMiddleware, store } from '@redux/store';
import { takeEvery, takeLatest } from 'redux-saga/effects';

import { createSelector } from 'reselect';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

export const toUpperCaseStyle = (map) =>
	Object.entries(map).reduce((result, [key, val]) => {
		key = key.replace(/([A-Z])/g, '_$1').toUpperCase();
		if (isObject(val)) {
			val = toUpperCaseStyle(val);
		}
		result[key] = val;
		return result;
	}, {});

export const createActionsFromMap = (map, prefix = '') => {
	map = toUpperCaseStyle({
		initState: void 0,
		setState: void 0,
		...map,
	});
	return createActions(map, { prefix });
};

// From: https://github.com/redux-utilities/redux-actions/blob/master/src/utils/flattenWhenNode.js
export const flatten = (map, partialFlatMap = {}, partialFlatActionType = '') => {
	const connectNamespace = (type) => (partialFlatActionType ? `${partialFlatActionType}.${type}` : type);

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

export const createReducerFromMap = (map, actions, initialState) => {
	map = flatten({
		initState() {
			return initialState;
		},
		setState(state, { payload }) {
			return {
				...state,
				...payload,
			};
		},
		...map,
	});
	map = Object.entries(map).reduce((result, [key, val]) => {
		const creator = key.split('.').reduce((actions, propKey) => actions[propKey], actions);
		if (!creator) {
			throw Error(`undefined action creator: ${key}`);
		}
		result[creator.toString()] = val;
		return result;
	}, {});

	return handleActions(map, initialState);
};

const toLocalSelectors = (selectors, getState) =>
	Object.entries(selectors).reduce(
		(result, [key, selector]) => {
			result[key] = createSelector(getState, selector);
			return result;
		},
		{
			getState,
		}
	);

const createSagaFromMap = (map, actions, selectors) => {
	map = flatten(map);
	map = Object.entries(map).map(([key, val]) => {
		let shouldTakeEvery = false;
		const actionType = key
			.split('.')
			.reduce((actions, propKey) => {
				if (propKey.startsWith('$')) {
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
					$action: actions,
					$selector: selectors,
				});
			} else {
				yield takeLatest(item[0], item[1], {
					$action: actions,
					$selector: selectors,
				});
			}
		}
	};
};

// 填补actionMap
const fillActionMap = (actionMap, map) => {
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
	action: actionMap = {},
	reducer: reducerMap = {},
	saga: sagaMap = {},
	selector = {},
	persist,
}) {
	const getSliceState = (state) => state[name];
	selector = toLocalSelectors(selector, getSliceState);
	fillActionMap(actionMap, reducerMap);
	fillActionMap(actionMap, sagaMap);
	const action = createActionsFromMap(actionMap, name);
	let sliceReducer = createReducerFromMap(reducerMap, action, state, name);
	const sliceSaga = createSagaFromMap(sagaMap, action, selector);

	if (persist) {
		sliceReducer = persistReducer(
			{
				key: name,
				storage,
				throttle: 1000,
				timeout: 8000,
				...persist,
			},
			sliceReducer
		);
	}

	injectAsyncReducer(store, name, sliceReducer);

	return {
		name,
		initialize,
		cache,
		selector,
		action,
		reducer: sliceReducer,
		removeReducer() {
			removeAsyncReducer(store, name);
			// if (__DEV__) {
			// 	console.log(`reducer of ${name} has been removed`);
			// }
		},
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
			// 	console.log(`saga of ${name} has been canceled`);
			// }
		},
	};
}
