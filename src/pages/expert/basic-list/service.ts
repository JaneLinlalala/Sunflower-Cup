import request from 'umi-request';
import { BasicListItemDataType } from './data.d';
import config from '@/utils/config';

interface ParamsType extends Partial<BasicListItemDataType> {
  count?: number;
}

export async function queryFakeList(params) {
  return request(`${config.domain}/getJudgeListForExpert`, {
    method: 'POST',
    data:params,
  });
}

export async function deleteFakeList(params: ParamsType) {
  return request(`${config.domain}/api/DeleteWork`, {
    method: 'POST',
    data: { id: 11 },
  });
}

export async function submitFakeList(params: ParamsType) {
  return request(`${config.domain}/api/FinishWork`, {
    method: 'POST',
    data: { id: 11 },
  });
}

export async function removeFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params: ParamsType) {
  const { count = 5, ...restParams } = params;
  return request('/api/fake_list', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'update',
    },
  });
}
