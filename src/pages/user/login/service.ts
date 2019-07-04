import request from 'umi-request';
import { UserLoginParams } from './index';
import config from '@/utils/config';


export async function Register(params: UserLoginParams) {
  return request(`${config.domain}/login/`, {
    method: 'POST',
    data: params,
  });
}
