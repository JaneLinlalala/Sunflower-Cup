import request from 'umi-request';
import { UserLoginParams } from './index';

export async function Register(params: UserLoginParams) {
  return request('http://liuterry.cn:8080/login/', {
    method: 'POST',
    headers: {
      cookies: "b7f63523588a457ba9a41c5ec83b6c16",
    },
    data: params,
  });
}
