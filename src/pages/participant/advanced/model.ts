import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { AdvancedProfileData } from './data.d';
import { queryAdvancedProfile } from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: AdvancedProfileData) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: AdvancedProfileData;
  effects: {
    fetchAdvanced: Effect;
  };
  reducers: {
    show: Reducer<AdvancedProfileData>;
  };
}

const Model: ModelType = {
  namespace: 'profileAdvanced',

  state: {
    data: {},
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
  },

  effects: {
    *fetchAdvanced(_, { call, put }) {
      const response = yield call(queryAdvancedProfile);
      yield put({
        type: 'show',
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

  },
};

export default Model;
