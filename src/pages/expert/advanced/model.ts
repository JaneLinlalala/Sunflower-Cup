import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
// eslint-disable-next-line sort-imports
import { AdvancedProfileData, AppraiseData } from './data.d';
import { downloadZipFile, getAppraise, queryAdvancedProfile, updateAppraise } from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: AdvancedProfileData) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: AdvancedProfileData;
  effects: {
    fetchAdvanced: Effect;
    downloadFile: Effect;
    saveAppraise: Effect;
    fetchAppraise: Effect;
  };
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    show: Reducer<AdvancedProfileData>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    down: Reducer<AdvancedProfileData>;
    handleFetchAppraise: Reducer<AdvancedProfileData>;
    handleSaveAppraise: Reducer<AdvancedProfileData>;
  };
}

// @ts-ignore
const Model: ModelType = {
  namespace: 'profileAdvanced',

  state: {
    data: {},
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
    appraise: { score: '', suggestion: '' },
  },

  effects: {
    *fetchAdvanced({ payload }, { call, put }) {
      const response = yield call(queryAdvancedProfile, payload);
      yield put({
        type: 'show',
        payload: response,
      });
    },

    *downloadFile(_, { call, put }) {
      const response = yield call(downloadZipFile);
      yield put({
        type: 'down',
        payload: response,
      });
    },

    *saveAppraise({ payload }, { call, put }) {
      const response = yield call(updateAppraise, payload);
      yield put({
        type: 'handleSaveAppraise',
        payload: response,
      });
    },

    *fetchAppraise({ payload }, { call, put }) {
      const response = yield call(getAppraise, payload);

      yield put({
        type: 'handleFetchAppraise',
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

    down(state, { payload }) {
      console.log(payload);
      console.log('test1');
      payload.blob().then(blob => {
        console.log('test');
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'filename.xlsx';
        a.click();
      });
      return {
        ...state,
        file: payload,
      };
    },

    handleFetchAppraise(state, { payload }) {
      console.log(payload);
      const pay = {
        ...state,
        appraise: payload,
        fetchAppraiseStatus: 'first',
      };
      return pay;
    },

    handleSaveAppraise(state, { payload }) {
      console.log('handleSaveAppraise', payload);
      return {
        ...state,
        saveAppraiseStatus: payload,
      };
    },
  },
};

export default Model;
