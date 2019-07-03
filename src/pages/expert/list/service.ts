import request from 'umi-request';
// eslint-disable-next-line sort-imports
import config from '../../config/config';
// eslint-disable-next-line sort-imports
import fakeData from './_mock';

export async function queryExpertList(params: string) {
  console.log(params);
  if (config.debug) {
    return fakeData.fakeExpertListData;
  }
  return request(`${config.domain}/api/ViewWorkList`, {
    method: 'POST',
    data: params,
  });
}

export async function submitExpertList(params: string[]) {
  if (config.debug) {
    return fakeData.submitResult;
  }
  return request(`${config.domain}/api/FinishWork`, {
    method: 'POST',
    data: JSON.stringify(params),
  });
}
