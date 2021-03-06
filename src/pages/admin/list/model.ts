import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { Modal } from 'antd';
import { queryExpertList, submitExpertList,finishExpertList } from './service';

export interface ProjectListItemDataType {
  id: string; //projectId
  projectName: string;
  competitionType: string;
  studentName: string;
  averageScore:string;
  rewardLevel:number;
}

export interface StateType {
  list: ProjectListItemDataType[];
  setReward:number;
  status?: string;
  comStatus:boolean;
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
    finish: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
    handleSubmit: Reducer<{ status: string }>;
  };
}

const Model: ModelType = {
  namespace: 'resultListState',

  state: {
    list: [],
    setReward:0,
    status: '',
    comStatus:true,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryExpertList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    *finish({ payload }, { call, put }) {
      const response = yield call(finishExpertList, payload);
      yield put({
        type: 'queryList',
        payload: response,
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
        list: action.payload.List,
        comStatus: action.payload.competitionStatus,
      };
    },
    handleSubmit(state, action) {
      console.log('status', action.payload);
      if (action.payload === 0) {
        Modal.success({
          title: '设置奖项成功！',
        });
      } else {
        Modal.error({
          title: '设置奖项失败！',
        });
      }
      return {
        ...state,
        status: action.payload,
      };
    },
  },
};

export default Model;
