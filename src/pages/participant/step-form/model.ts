import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { Submit } from './service';
import { TableFormDateType } from '@/pages/participant/step-form/components/Step1/TableForm';

export interface StateType {
  current?: string;
  step?: {
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
    friends: [];
    projectType: number;
    details: string;
    invention: string;
    keywords: string;
    studentId:number;
  };
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submitStepForm: Effect;
  };
  reducers: {
    saveStepFormData: Reducer<StateType>;
    saveCurrentStep: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'formStepForm',
  state: {
    current: 'info',
    step: {
      id: '8',
      projectName: '',
      college: '',
      competitionType: '',
      studentName: '',
      studentNumber: '',
      birthDay: '',
      education: '',
      major: '',
      entryYear: '',
      projectFullName: '',
      address: '',
      phone: '',
      email: '',
      friends: [],
      projectType: '',
      details: '',
      invention: '',
      keywords: '',
      studentId:5,
    },
  },

  effects: {
    *submitStepForm({ payload }, { call, put }) {
      yield call(Submit, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put({
        type: 'saveCurrentStep',
        payload: 'result',
      });
    },
  },

  reducers: {
    saveCurrentStep(state, { payload }) {
      return {
        ...state,
        current: payload,
      };
    },

    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...(state as StateType).step,
          ...payload,
        },
      };
    },
  },
};

export default Model;
