import { AnyAction, Reducer } from 'redux';
import token from '@/utils/token';
import { EffectsCommandMap } from 'dva';
// @ts-ignore
import { Register } from './service';
import {reloadAuthorized} from "@/utils/Authorized";
import {routerRedux} from "dva/router";
import {getAuthority, setAuthority} from "@/utils/authority";

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
    loginHandle: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userLogin',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(Register, payload);
      yield put({
        type: 'loginHandle',
        payload: {res: response, sta: payload}
      });
      if(response != 'fail' && response){
        token.save(response);
        let to = token.get();
        console.log(to);
        reloadAuthorized();
        yield put(routerRedux.push('/workplace'));
      }
    },
  },

  reducers: {
    loginHandle(state, { payload }) {
      console.log('payload', payload);
      console.log(payload.sta.userType);
      if(payload.sta.userType=='0'){
        setAuthority("user");
      }
      else if(payload.sta.userType=='1'){
        setAuthority("expert");
      }
      else if(payload.sta.userType=='2'){
        setAuthority("admin");
      }
      let current = getAuthority();
      console.log(current)
      return {
        ...state,
        status: payload === 'fail' ? 'error' : payload,
      };
    },
  },
};

export default Model;
