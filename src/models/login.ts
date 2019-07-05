import { AnyAction, Reducer } from 'redux';
import { parse, stringify } from 'qs';

import { EffectsCommandMap } from 'dva';
import { routerRedux } from 'dva/router';
import {reloadAuthorized} from "@/utils/Authorized";
import {getAuthority, setAuthority} from "@/utils/authority";
import currentUserName from "@/utils/currentUserName";
import currentUserId from "@/utils/currentUserId";
import token from "@/utils/token";
import {Register} from "@/pages/user/login/service";

export function getPageQuery(): {
  [key: string]: string;
} {
  return parse(window.location.href.split('?')[1]);
}

export interface StateType {
  status?: 'ok' | 'error' | 'out';
  currentAuthority?: 'user' | 'guest' | 'admin' | 'expert';
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    submit:Effect;
    logout: Effect;
  };
  reducers: {
    loginHandle: Reducer<StateType>;
    changeLoginStatus: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(Register, payload);
      yield put({
        type: 'loginHandle',
        payload: response,
      });
      console.log(response.msg);
      if (response.msg === 'success') {
        token.save(response.ticket);
        const to = token.get();
        console.log(to);
        reloadAuthorized();
        yield put(routerRedux.push('/workplace'));
      }
    },
    *logout(_, { put }) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      const { redirect } = getPageQuery();
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },

  reducers: {
    loginHandle(state, { payload }) {
      let userName;
      let userId;
      console.log('payload', payload);
      if (payload.msg === 'success') {
        if (payload.userType === 'student') {
          setAuthority('user');
          userName = payload.user.studentName;
          userId = payload.user.id;
        } else if (payload.userType === 'expert') {
          setAuthority('expert');
          userName = payload.user.expertName;
          userId = payload.user.id;
        } else if (payload.userType === 'admin') {
          setAuthority('admin');
          // eslint-disable-next-line prefer-destructuring
          userName = payload.user.userName;
          userId = payload.user.id;
        }
        currentUserId.save(userId);
        currentUserName.save(userName);
        let current = getAuthority();
        console.log(userId);
        console.log(userName);
        console.log(current);
      }
      return {
        ...state,
        status: payload.msg === 'fail' ? 'error' : 'ok',
      };
    },
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      currentUserName.remove();
      currentUserId.remove();
      token.remove();
      console.log(token.get());
      console.log(currentUserName.get());
      return {
        ...state,
        status: 'out',
        type: payload.type,
      };
    },
  },
};

export default Model;
