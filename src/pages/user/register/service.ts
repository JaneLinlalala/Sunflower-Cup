import request from 'umi-request';
import { UserRegisterParams } from './index';

export async function Register(params: UserRegisterParams) {
  return request('http://liuterry.cn:8080/studentReg/', {
    method: 'POST',
    data: params,
  });
}
