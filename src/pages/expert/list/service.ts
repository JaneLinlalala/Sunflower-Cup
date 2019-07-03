import request from 'umi-request';
// eslint-disable-next-line sort-imports,import/no-absolute-path
import config from '../../../utils/config';
// eslint-disable-next-line sort-imports
import fakeData from './_mock';

export async function queryExpertList(params: string) {
  console.log(params, config.domain);
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
  const status = request(`${config.domain}/api/FinishWork`, {
    method: 'POST',
    data: JSON.stringify(params),
  });
  return { status };
}
