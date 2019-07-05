import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import {queryCompetitionList, queryCompetitionState} from './service';

export interface CompetitionListItemDataType {
  id: string;
  competitionName: string;
  startTime: string;
  endTime: string;
  description: string;
  startTimeFormat: string;
  endTimeFormat: string;
}
export interface CompetitionResultListItemDataType {
  id:string;
  projectName:string;
  studentName:string;
}

export interface StateType1 {
  list: CompetitionListItemDataType[];
}

export interface StateType2 {
  list: CompetitionResultListItemDataType[];
}


export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType2) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: {
    list01: StateType2,
    list02: StateType2,
    list03: StateType2,
    list11: StateType2,
    list12: StateType2,
    list13: StateType2,
    competitionState: string,
    };
  effects: {
    fetch: Effect;
    fetchState: Effect;
  };
  reducers: {
    queryList01: Reducer<StateType2>;
    queryList02: Reducer<StateType2>;
    queryList03: Reducer<StateType2>;
    queryList11: Reducer<StateType2>;
    queryList12: Reducer<StateType2>;
    queryList13: Reducer<StateType2>;
    queryState: Reducer<StateType2>;
  };
}


const Model: ModelType = {
  namespace: 'competitionResult',

  state: {
    list01: [],
    list02: [],
    list03: [],
    list11: [],
    list12: [],
    list13: [],
    competitionState: 'doing',
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      let param = {
        id: payload,
        competitionType: 0,
        grade: 1,
      };
      let response1 = yield call(queryCompetitionList, param);
      console.log(response1);
      yield put({
        type: 'queryList01',
        payload: Array.isArray(response1) ? response1 : [],
      });

       param = {
        id: payload,
        competitionType: 0,
        grade: 2,
      };
       response1 = yield call(queryCompetitionList, param);
      console.log(response1);
      yield put({
        type: 'queryList02',
        payload: Array.isArray(response1) ? response1 : [],
      });

      param = {
        id: payload,
        competitionType: 0,
        grade: 3,
      };
      response1 = yield call(queryCompetitionList, param);
      console.log(response1);
      yield put({
        type: 'queryList03',
        payload: Array.isArray(response1) ? response1 : [],
      });

      param = {
        id: payload,
        competitionType: 1,
        grade: 1,
      };
      response1 = yield call(queryCompetitionList, param);
      console.log(response1);
      yield put({
        type: 'queryList11',
        payload: Array.isArray(response1) ? response1 : [],
      });

      param = {
        id: payload,
        competitionType: 1,
        grade: 2,
      };
      response1 = yield call(queryCompetitionList, param);
      console.log(response1);
      yield put({
        type: 'queryList12',
        payload: Array.isArray(response1) ? response1 : [],
      });

      param = {
        id: payload,
        competitionType: 1,
        grade: 3,
      };
      response1 = yield call(queryCompetitionList, param);
      console.log(response1);
      yield put({
        type: 'queryList13',
        payload: Array.isArray(response1) ? response1 : [],
      });

    },
    *fetchState({ payload }, { call, put }){
      const response = yield call(queryCompetitionState, payload);
      yield put ({
        type: 'queryState',
        payload: response,
      });
    },
  },
  reducers: {
    queryList01(state, { payload }) {
      console.log(payload);
      const formatPayload = payload;
      return {
        ...state,
        list01: formatPayload,
      };
    },
    queryList02(state, { payload }) {
      console.log(payload);
      const formatPayload = payload;
      return {
        ...state,
        list02: formatPayload,
      };
    },
    queryList03(state, { payload }) {
      console.log(payload);
      const formatPayload = payload;
      return {
        ...state,
        list03: formatPayload,
      };
    },
    queryList11(state, { payload }) {
      console.log(payload);
      const formatPayload = payload;
      return {
        ...state,
        list11: formatPayload,
      };
    },
    queryList12(state, { payload }) {
      console.log(payload);
      const formatPayload = payload;
      return {
        ...state,
        list12: formatPayload,
      };
    },
    queryList13(state, { payload }) {
      console.log(payload);
      const formatPayload = payload;
      return {
        ...state,
        list13: formatPayload,
      };
    },
    queryState(state, { payload }) {
      console.log("model:competitionState"+ payload);
      return {
        ...state,
        competitionState: payload,
      };
    },

  },
};

export default Model;
