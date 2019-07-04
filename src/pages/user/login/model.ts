import { AnyAction, Reducer } from 'redux';
import token from '@/utils/token';
import currentUserId from '@/utils/currentUserId';
import currentUserName from '@/utils/currentUserName';
import { EffectsCommandMap } from 'dva';
import { Register } from './service';
import { reloadAuthorized } from '@/utils/Authorized';
import { routerRedux } from 'dva/router';
import { getAuthority, setAuthority } from '@/utils/authority';

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
        currentUserId.save(userId);
        const current = getAuthority();
        console.log(userId);
        console.log(userName);
        console.log(current);
      }
      return {
        ...state,
        status: payload.msg === 'fail' ? 'error' : 'ok',
      };
    },
  },
};

export default Model;
