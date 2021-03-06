import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { AdvancedProfileData } from './data.d';
import { queryAdvancedProfile,getdownloadFile } from './service';

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
    *fetchAdvanced({payload}, { call, put }) {
      const response = yield call(queryAdvancedProfile,payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },

    *downloadFile({payload}, { call, put }) {
      console.log(payload.url)
      const response = yield call(getdownloadFile,payload.url);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },

  reducers: {
    show(state, { payload }) {
      payload.friends = JSON.parse(payload.friends);
      console.log(payload.friends);
      return {
        ...state,
        data: payload,
      };
    },
    down(state, { payload }) {
      console.log(payload);
      console.log("test1");
      return {
        ...state,
        file: payload,
      };
    },

  },
};

export default Model;
