import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { fakeRegister,passRegister } from './service';

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
    pass: Effect;
  };
  reducers: {
    registerHandle: Reducer<StateType>;
    registerPass:Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userRegister',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
    *pass({ payload }, { call, put }) {
      const response = yield call(passRegister, payload);
      yield put({
        type: 'registerPass',
        payload: response,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload === 'success' ? 'ok' : 'error',
      };
    },
    registerPass(state, { payload }) {
      return {
        ...state,
      };
    },
  },
};

export default Model;
