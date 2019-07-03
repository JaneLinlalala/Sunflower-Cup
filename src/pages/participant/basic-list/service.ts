import request from 'umi-request';
import { BasicListItemDataType } from './data.d';

interface ParamsType extends Partial<BasicListItemDataType> {
  count?: number;
}

export async function queryFakeList(params: ParamsType) {
  return request('http://liuterry.cn:8080/api/ViewWorkList', {
    method: 'POST',
    headers: {
      cookies: "4ed3b26bf9a440fdbeb6dd9c266fc901",
    },
    data:{"studentId":5}
  });
}
export async function createFakeList(params) {
  return request('http://liuterry.cn:8080/api/CreateWork', {
    method: 'POST',
    headers: {
      cookies: "4ed3b26bf9a440fdbeb6dd9c266fc901",
    },
    data:params,
  });
}

export async function deleteFakeList(params) {
  return request('http://liuterry.cn:8080/api/DeleteWork', {
    method: 'POST',
    headers: {
      cookies: "4ed3b26bf9a440fdbeb6dd9c266fc901",
    },
    data:params,
  });
}

export async function submitFakeList(params) {
  return request('http://liuterry.cn:8080/api/FinishWork', {
    method: 'POST',
    headers: {
      cookies: "4ed3b26bf9a440fdbeb6dd9c266fc901",
    },
    data:params
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
