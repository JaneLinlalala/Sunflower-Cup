import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { Modal } from 'antd';
import { queryExpertList, submitExpertList } from './service';

export interface ExpertListItemDataType {
  id: string;
  name: string;
  major: string;
  email: string;
}

export interface StateType {
  list: ExpertListItemDataType[];
  status?: string;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    submit: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    handleSubmit: Reducer<{ status: string }>;
  };
}

const Model: ModelType = {
  namespace: 'listState',

  state: {
    list: [],
    status: '',
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryExpertList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      const response = yield call(submitExpertList, payload); // post
      yield put({
        type: 'handleSubmit',
        payload: response,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    handleSubmit(state, action) {
      if (action.payload.status === 'success') {
        Modal.info({
          title: '邮件发送成功！',
        });
      } else {
        Modal.error({
          title: '邮件发送失败！',
        });
      }
      return {
        ...state,
        status: action.payload.status,
      };
    },
  },
};

export default Model;
