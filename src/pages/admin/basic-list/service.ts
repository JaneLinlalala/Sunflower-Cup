import request from 'umi-request';
import { BasicListItemDataType } from './data.d';
import token from '@/utils/token';

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
export async function createFakeList() {
  return request('http://liuterry.cn:8080/api/CreateWork', {
    method: 'POST',
    headers: {
      cookies: "4ed3b26bf9a440fdbeb6dd9c266fc901",
    },
    data:{"studentId":5}
  });
}

export async function deleteFakeList(params: ParamsType) {
  return request('http://liuterry.cn:8080/api/DeleteWork', {
    method: 'POST',
    headers: {
      cookies: "4ed3b26bf9a440fdbeb6dd9c266fc901",
    },
    data:{"id":8}
  });
}

export async function submitFakeList(params: ParamsType) {
  return request('http://liuterry.cn:8080/api/FinishWork', {
    method: 'POST',
    headers: {
      cookies: "4ed3b26bf9a440fdbeb6dd9c266fc901",
    },
    data:{"id":5}
  });
}

export async function testFakeList() {
  const curToken = token.get();
  // @ts-ignore
  return request('http://180.76.233.101:8080/testCookie', {
    method: 'POST',
    headers: {
      cookies: curToken,
    },
    data:{"id":5}
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
