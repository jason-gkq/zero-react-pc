import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { injectAsyncReducer } from "@/zero/redux/configureStore";
import { HttpClient } from "@/zero/api";
interface CounterState {
  // value: number;
  // advertConfig: any;
  // specialLook: any;
  dataDict: any;
}
// const advertConfig = JSON.parse(sessionStorage.get("advertConfig"));
// const specialLook = JSON.parse(JSON.parse(sessionStorage.get("specialLook")));

const initialState: CounterState = {
  // value: 0,
  // advertConfig,
  // specialLook,
  dataDict: {
    1001: [], // '产品类型'
    1002: [], // '广告类型'
    1003: [], // '栏目类型'
    1004: [], // '卡片类型'
    1005: [], // '专题名称'
    1006: [], // '发布渠道'
    1007: [], // '图片尺寸'
  },
};

export const operationSlice = createSlice({
  name: "operation",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // setDataDict: {
    //   reducer(state, action: PayloadAction<any[]>) {
    //     state.dataDict = Object.assign(state.dataDict, action.payload);
    //   },
    //   prepare(type: string, data: []) {
    //     return {
    //       payload: {
    //         [type]: data,
    //       },
    //     };
    //   },
    // },
    setDataDict: (state, action) => {
      state.dataDict = Object.assign(state.dataDict, action.payload);
    },
    // extraReducers(builder: any) {
    //   builder.addCase(
    //     fetchDataDict.fulfilled,
    //     (state: any, action: PayloadAction<any>) => {
    //       console.log(">>>>>>", state, action);
    //       state.dataDict = Object.assign({}, state.dataDict, action.payload);
    //       return state;
    //     }
    //   );
    // },
  },
});

export const selectDataDict = (state: any) => state.operation.dataDict;

export const { setDataDict } = operationSlice.actions;

export const fetchDataDict = createAsyncThunk(
  "operation/fetchDataDict",
  async (payload: { dataType: number }, { dispatch, getState }) => {
    const { dataType } = payload;
    const { data } = await HttpClient.get("data/list", {
      params: { dataType },
    });
    await dispatch(setDataDict({ [dataType]: data }));
    return await { [dataType]: data };
  }
);

export const getDataDict = (type: number) => {
  return async (dispatch: any, getState: any) => {
    let dataDict = selectDataDict(getState());

    if (!dataDict[type] || dataDict[type].length === 0) {
      await dispatch(fetchDataDict({ dataType: type }));

      dataDict = selectDataDict(getState());
    }
    return dataDict[type];
  };
};

injectAsyncReducer("operation", operationSlice.reducer);

export default operationSlice.reducer;
