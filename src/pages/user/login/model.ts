import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
// @ts-ignore
import { Register } from './service';

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submit: Effect;
  };
  reducers: {
    loginHandle: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userLogin',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(Register, payload);
      yield put({
        type: 'loginHandle',
        payload: response,
      });
    },
  },

  reducers: {
    loginHandle(state, { payload }) {
      console.log('payload', payload);
      return {
        ...state,
        status: payload === 'failed' ? 'error' : payload,
      };
    },
  },
};

export default Model;
