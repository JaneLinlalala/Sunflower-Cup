import request from 'umi-request';
import { BasicListItemDataType } from './data.d';
import config from '@/utils/config';

interface ParamsType extends Partial<BasicListItemDataType> {
  count?: number;
}

export async function queryFakeList(params) {
  return request(`${config.domain}/showAlreadyList`, {
    method: 'POST',
    data:params,
  });
}

export async function backFakeList(params) {
  return request(`${config.domain}/giveBackProject`, {
    method: 'POST',
    data:params,
  });
}

export async function passAllFakeList(params) {
  return request(`${config.domain}/passFirstTest`, {
    method: 'POST',
    data:params,
  });
}

export async function rejectAllFakeList(params) {
  return request(`${config.domain}/rejectFirstTest`, {
    method: 'POST',
    data:params,
  });
}

