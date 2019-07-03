import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { AdvancedProfileData } from './data.d';
import { queryAdvancedProfile,getdownloadFile, passAdvancedProfile,rejectAdvancedProfile } from './service';

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
    passAdvancedProfile:Effect;
    rejectAdvanced:Effect;
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
    *passAdvanced({payload}, { call, put }) {
      const response = yield call(passAdvancedProfile,payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
    *rejectAdvanced({payload}, { call, put }) {
      const response = yield call(rejectAdvancedProfile,payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },

    *downloadFile(_, { call, put }) {
      const response = yield call(getdownloadFile("http://180.76.233.101/2.txt"));
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
      return {
        ...state,
        file: payload,
      };
    },

  },
};

export default Model;
