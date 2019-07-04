import request from 'umi-request';
// eslint-disable-next-line sort-imports
import config from '../../../utils/config';
// eslint-disable-next-line sort-imports
import fakeData from './_mock';

export async function queryExpertList() {
  return request(`${config.domain}/findJudgedList`, {
    method: 'POST',
    data:{},
  });
}

export async function submitExpertList(params: { receivers: string }) {
  if (config.debug) {
    return fakeData.submitResult;
  }
  return request(`${config.domain}/inviteExperts`, {
    method: 'POST',
    data: params,
  });
}
