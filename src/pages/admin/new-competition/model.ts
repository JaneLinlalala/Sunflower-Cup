import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
// eslint-disable-next-line sort-imports
import { newCompetitionSubmit, updateCompetitionSubmit } from './service';

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
    update: Effect;
  };
  reducers: {
    SubmitHandler: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'newCompetition',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(newCompetitionSubmit, payload);
      yield put({
        type: 'SubmitHandler',
        payload: response,
      });
    },
    *update({ payload }, { call, put }) {
      const response = yield call(updateCompetitionSubmit, payload);
      yield put({
        type: 'SubmitHandler',
        payload: response,
      });
    },
  },

  reducers: {
    SubmitHandler(state, { payload }) {
      return {
        ...state,
        status: payload === 'success' ? 'ok' : 'error',
      };
    },
  },
};

export default Model;
