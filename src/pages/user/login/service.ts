import request from 'umi-request';
import { UserLoginParams } from './index';


export async function Register(params: UserLoginParams) {
  return request('http://liuterry.cn:8080/login/', {
    method: 'POST',
    data: params,
  });
}
