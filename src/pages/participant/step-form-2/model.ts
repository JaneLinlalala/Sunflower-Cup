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
      id: '5',
      projectName: '基于图形图像',
      college: '软件学院',
      competitionType: '1',
      studentName: '孙龙',
      studentNumber: '16211121',
      birthDay: '19980501',
      education: '大学本科',
      major: '专业',
      entryYear: '2016',
      projectFullName: '基于图形图像的敏感文字',
      address: '大运村',
      phone: '15811599533',
      email: '15811599533@163.com',
      friends: [],
      projectType: '5',
      details: '作品总体情况作品总体情况作品总体情况作品总体情况作品总体情况作品总体情况作品总体情况作品总体情况作品总体情况',
      invention: '创新点创新点创新点创新点创新点创新点创新点创新点创新点创新点创新点创新点创新点创新点',
      keywords: '机器学习、图像识别',
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
