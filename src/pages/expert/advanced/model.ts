import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { AdvancedProfileData } from './data.d';
import { queryAdvancedProfile,downloadZipFile } from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: AdvancedProfileData) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: AdvancedProfileData;
  effects: {
    fetchAdvanced: Effect;
    downloadFile: Effect;
  };
  reducers: {
    show: Reducer<AdvancedProfileData>;
  };
}

// @ts-ignore
const Model: ModelType = {
  namespace: 'profileAdvanced',

  state: {
    data: {},
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
  },

  effects: {
    *fetchAdvanced(payload, { call, put }) {
      const response = yield call(queryAdvancedProfile,payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },

    *downloadFile(_, { call, put }) {
      const response = yield call(downloadZipFile);
      yield put({
        type: 'down',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      console.log(payload);
      return {
        ...state,
        data: payload,
      };
    },
    down(state, { payload }) {
      console.log(payload);
      console.log("test1");
      payload.blob().then(blob => {
        console.log("test")
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "filename.xlsx";
        a.click();
      });
      return {
        ...state,
        file: payload,
      };
    },

  },
};

export default Model;
