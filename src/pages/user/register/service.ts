import request from 'umi-request';
import { UserRegisterParams } from './index';
import config from '@/utils/config';

export async function Register(params: UserRegisterParams) {
  return request(`${config.domain}/studentReg/`, {
    method: 'POST',
    data: params,
  });
}
