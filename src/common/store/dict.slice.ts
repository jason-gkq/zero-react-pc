import { call, put, select } from "redux-saga/effects";
import { createModel, HttpClient, sessionStorage } from "@/zero";
type ISagas = any;

export type IDictItem = {
  createBy: string;
  createTime: string;
  cssClass: string;
  dataScope: string;
  default: boolean;
  dictCode: number;
  dictLabel: string;
  dictSort: number;
  dictType: string;
  dictValue: string;
  isDefault: string;
  listClass: string;
  params: any;
  remark: string;
  searchValue: string;
  status: string;
  updateBy: string;
  updateTime: string;
};

const getAll = async (): Promise<{ data: any }> => {
  const { data }: { data: any } = await HttpClient.get("system/dict/data/all");
  return { data };
};

const getDictByType = async (
  dictType: string
): Promise<{ data: IDictItem[] }> => {
  const { data }: { data: IDictItem[] } = await HttpClient.get(
    `system/dict/data/dictType/${dictType}`
  );
  return { data };
};

const getDictById = async (
  dataType: string
): Promise<{ data: IDictItem[] }> => {
  const { data }: { data: IDictItem[] } = await HttpClient.get(`data/list`, {
    params: { dataType },
  });
  return { data };
};

const dictDataCache: any = sessionStorage.get("dict") || {};
const enumDataCache: any = sessionStorage.get("dictenum") || {
  1001: [], // '产品类型'
  1002: [], // '广告类型'
  1003: [], // '栏目类型'
  1004: [], // '卡片类型'
  1005: [], // '专题名称'
  1006: [], // '发布渠道'
  1007: [], // '图片尺寸'
};

const dict = createModel({
  namespace: "dict",
  isGlobal: true,
  state: {
    dictData: dictDataCache,
    enumData: enumDataCache,
    conter: 1,
  },
  reducers: {},
  subscriptions: {
    setup({ dispatch, $actions }: any) {
      dispatch($actions.onReady({ conter: 1000 }));
    },
  },
  effects: {
    *onReady({ $actions, $selectors }: ISagas, { payload }: any) {
      console.log("onReady----------", $actions, $selectors);
      console.log("888888*******************", payload);
      yield call(getAll);
      const { conter } = yield select($selectors.getState);
      console.log("，，，22", conter);
      yield put($actions.setState({ conter: conter + 20 }));
    },
    *onInit({ $actions, $selectors }: ISagas, { payload }: any) {
      // console.log("onReady----------", $actions, $selectors);
      // const { conter } = yield select($selectors.getState);
      // console.log("888888*******************", conter);
      // const { conter } = $selectors.getState();
      // console.log("，，，22", conter);
      // yield put($actions.setState({ conter: conter + 10 }));
    },
    *getDictData(
      { $actions, $selectors }: ISagas,
      { payload }: { payload: string[] }
    ) {
      const rel: any = {};
      const { dictData } = yield select($selectors.getState);
      const promisePayload: string[] = [];
      const promises = [];
      for (let i = 0; i < payload.length; i++) {
        const tempType = payload[i];
        if (dictData && dictData[tempType]) {
          rel[tempType] = dictData[tempType];
        } else {
          promisePayload.push(tempType);
          tempType === "all"
            ? promises.push(getAll())
            : promises.push(getDictByType(tempType));
        }
      }
      if (promisePayload.length === 0) {
        return;
      }
      try {
        const [...data] = yield Promise.allSettled(promises);
        data.forEach((item: any, index: number) => {
          rel[promisePayload[index]] = (item.status && item.value.data) || [];
        });
        const newDictData = Object.assign({}, dictData, rel);
        sessionStorage.set("dict", newDictData);
        yield put($actions.setState({ dictData: newDictData }));
        return;
      } catch (error) {
        return;
      }
    },
    *$getEnumData(
      { $actions, $selectors }: ISagas,
      { payload }: { payload: number[] }
    ) {
      const { enumData } = yield select($selectors.getState);
      const promisePayload: number[] = [];
      const promises = [];
      const rel: any = {};
      for (let i = 0; i < payload.length; i++) {
        const tempType = payload[i];
        if (enumData && enumData[tempType].length > 0) {
          rel[tempType] = enumData[tempType];
        } else {
          promisePayload.push(tempType);
          promises.push(getDictById(String(tempType)));
        }
      }
      if (promisePayload.length === 0) {
        return;
      }
      try {
        const [...data] = yield Promise.allSettled(promises);
        data.forEach((item: any, index: number) => {
          rel[promisePayload[index]] = (item.status && item.value.data) || [];
        });
        const newEnumData = Object.assign({}, enumData, rel);
        sessionStorage.set("dictenum", newEnumData);
        yield put($actions.setState({ enumData: newEnumData }));
        return;
      } catch (error) {
        return;
      }
    },
  },
});
export default dict;
