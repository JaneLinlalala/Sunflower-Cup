import request from 'umi-request';
import { userRegisterParams } from './index';
import config from '@/utils/config';

export async function fakeRegister(params: userRegisterParams) {
  return request(`${config.domain}/expertReg/`, {
    method: 'POST',
    data: params,
  });
}

export async function passRegister(params) {
  return request(`${config.domain}/acceptInvite`, {
    method: 'POST',
    data: params,
  });
}
