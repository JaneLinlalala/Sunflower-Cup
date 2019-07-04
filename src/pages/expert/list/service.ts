import request from 'umi-request';
// eslint-disable-next-line sort-imports
import config from '../../../utils/config';
// eslint-disable-next-line sort-imports
import fakeData from './_mock';

export async function queryExpertList(params: string) {
  console.log(params, config.domain);
  if (config.debug) {
    return fakeData.fakeExpertListData;
  }
  return request(`${config.domain}/viewExpertList`, {
    method: 'POST',
    data: params,
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
