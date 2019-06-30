import request from 'umi-request';
import { TableListParams } from './data.d';

export async function queryRule(params: TableListParams) {
  return request('http://liuterry.cn:8080/api/ViewWorkList', {
    method: 'POST',
    data:{"studentId":5}
  });
}
export async function removeRule(params: TableListParams) {
  return request('http://liuterry.cn:8080/api/ViewWorkList', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('http://liuterry.cn:8080/api/ViewWorkList', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('http://liuterry.cn:8080/api/ViewWorkList', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
