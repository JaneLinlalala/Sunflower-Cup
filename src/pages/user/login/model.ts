import { AnyAction, Reducer } from 'redux';
import token from '@/utils/token';
import currentUserId from '@/utils/currentUserId';
import currentUserName from '@/utils/currentUserName';
import { EffectsCommandMap } from 'dva';
import { Register } from './service';
import {reloadAuthorized} from "@/utils/Authorized";
import {routerRedux} from "dva/router";
import {getAuthority, setAuthority} from "@/utils/authority";
import {stringify} from "qs";

export interface StateType {
  status?: 'ok' | 'error' | 'out';
  currentAuthority?: 'user' | 'guest' | 'admin' | 'expert';
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
    logout: Effect;
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
      if(response.msg === 'success'){
        token.save(response.ticket);
        let to = token.get();
        console.log(to);
        reloadAuthorized();
        yield put(routerRedux.push('/workplace'));
      }
    },
    *logout(_, { put }) {
      yield put({
        type: 'logoutHandle',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    loginHandle(state, { payload }) {
      var userName;
      var userId;
      console.log('payload', payload);
      if(payload.msg==='success'){
        if(payload.userType=='student'){
          setAuthority("user");
          userName=payload.user.studentName;
          userId=payload.user.id;
        }
        else if(payload.userType=='expert'){
          setAuthority("expert");
          userName=payload.user.expertName;
          userId=payload.user.id;
        }
        else if(payload.userType=='admin'){
          setAuthority("admin");
          userName=payload.user.userName;
          userId=payload.user.id;
        }
        currentUserId.save(userId);
        currentUserName.save(userName);
        let current = getAuthority();
        console.log(userId);
        console.log(userName);
        console.log(current)
      }
      return {
        ...state,
        status: payload.msg === 'fail' ? 'error' : 'ok',
      };
    },
    logoutHandle(state, { payload }) {
      setAuthority(payload.currentUser);
      currentUserName.remove();
      currentUserId.remove();
      token.remove();
      console.log(token.get());
      console.log(currentUserName.get());
      return {
        ...state,
        status:'out',
      };
    },
  },
};

export default Model;
