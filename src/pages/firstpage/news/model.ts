import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { queryCompetitionList } from './service';

export interface CompetitionListItemDataType {
  id: string;
  competitionName: string;
  startTime: string;
  endTime: string;
  description: string;
  startTimeFormat: string;
  endTimeFormat: string;
}

export interface StateType {
  list: CompetitionListItemDataType[];
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
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const timeFormat = (time: string) => {
  let timeStr = '';
  const date = new Date(time);
  timeStr += `${date.getFullYear()}-`;
  if ((date.getMonth() + 1).toString().length < 2) {
    timeStr += '0';
  }
  timeStr += `${date.getMonth() + 1}-`;
  if ((date.getDate()).toString().length < 2) {
    timeStr += '0';
  }
  timeStr += `${date.getDate()}`;
  return timeStr;
};

const Model: ModelType = {
  namespace: 'listState',

  state: {
    list: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryCompetitionList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    queryList(state, { payload }) {
      const formatPayload = payload;
      for (let i = 0; i < formatPayload.length; i += 1) {
        formatPayload[i].startTimeFormat = timeFormat(payload[i].startTime);
        formatPayload[i].endTimeFormat = timeFormat(payload[i].endTime);
      }
      return {
        ...state,
        list: formatPayload,
      };
    },
  },
};

export default Model;
