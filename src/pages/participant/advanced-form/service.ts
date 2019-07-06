import request from 'umi-request';
import token from "@/utils/token";
import {StateType} from "@/pages/participant/advanced-form/model";

const curToken=token.get();
export async function Query(params) {
  return request('http://180.76.233.101:8080/api/ViewWorkInfo', {
    method: 'POST',
    headers:{
      cookies:curToken,
    },
    data: params,
  });
}

export async function Submit(params: StateType) {
  return request('http://180.76.233.101:8080/api/UpdateWork', {
      method: 'POST',
      headers: {
        cookies:curToken,
      },
      data:params,
   });
}
