import { all, put, call, takeLatest } from 'redux-saga/effects';

import model from '@src/app/index.model';

// 用于缓存所有effects函数
const rootSagas = [];
// 对每个model进行操作-处理对应的effects
if (model && model.sagas) {
	const { sagas } = model;
	for (let key in sagas) {
		const watch = function* () {
			yield takeLatest(key, function* (obj) {
				// 第二个参数只传递了最常用的call,put进去，
				// 如果想用更多其他'redux-saga/effects'的API，可在各自model中自行引入
				try {
					yield sagas[key](obj, { call, put });
				} catch (e) {
					// 统一处理effects抛出的错误
				}
			});
		};
		rootSagas.push(watch());
	}
}

export default function* rootSaga() {
	yield all(rootSagas);
}
