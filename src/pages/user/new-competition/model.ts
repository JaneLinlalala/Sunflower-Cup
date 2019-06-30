import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { NewCompetitionSubmit } from './service';

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
    newCompetitionSubmitHandle: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'newCompetition',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(NewCompetitionSubmit, payload);
      yield put({
        type: 'newCompetitionSubmitHandle',
        payload: response,
      });
    },
  },

  reducers: {
    newCompetitionSubmitHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};

export default Model;
