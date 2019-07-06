import request from 'umi-request';
import token from "@/utils/token";
import {StateType} from "@/pages/participant/advanced-form/model";
import config from "@/utils/config";

const curToken=token.get();
export async function Query(params) {
  return request(`${config.domain}/api/ViewWorkInfo`, {
    method: 'POST',
    headers:{
      cookies:curToken,
    },
    data: params,
  });
}

export async function Submit(params: StateType) {
  return request(`${config.domain}/api/UpdateWork`, {
      method: 'POST',
      headers: {
        cookies:curToken,
      },
      data:params,
   });
}
