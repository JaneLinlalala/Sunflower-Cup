import request from 'umi-request';
import { userRegisterParams } from './index';

export async function fakeRegister(params: userRegisterParams) {
  return request('http://liuterry.cn:8080/expertReg/', {
    method: 'POST',
    data: params,
  });
}
