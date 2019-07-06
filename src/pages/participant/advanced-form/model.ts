import {AnyAction, Reducer} from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { Submit } from './service';
import {Query} from "@/pages/participant/advanced-form/service";
import currentUserId from '@/utils/currentUserId';
import TableFormDateType from './components/TableForm'


export interface StateType {
  id: string;
  projectName: string;
  college: string;
  competitionType: number;
  studentName: string;
  studentNumber: string;
  birthDay: string;
  education: string;
  major: string;
  entryYear: string;
  projectFullName: string;
  address: string;
  phone: string;
  email: string;
  friends:[];
  projectType: number;
  details: string;
  invention: string;
  keywords: string;
  studentId:number;
  additionalMessage:string;
}


export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;



export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitAdvancedForm: Effect;
    fetchAdvanced: Effect;
  };
  reducers: {
    show: Reducer<StateType>;
    saveStepFormData:Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'FormType',
  state: {
      studentId:currentUserId.get(),
  },

  effects: {
    *submitAdvancedForm({ payload }, { call,put }) {
      const response=yield call(Submit, payload);
      yield put({
        type: 'saveStepFormData',
        payload:response,
      });
      message.success('保存成功');
    },

    *fetchAdvanced({payload}, { call, put }) {
      const response = yield call(Query,payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },
  },
  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
      };
    },
    show(state, {payload}) {
      return {
        ...state,
        data:payload,
      };
    },
  }
};

export default Model;
