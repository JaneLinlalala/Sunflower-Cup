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
  return request(`${config.domain}/giveRewards`, {
    method: 'POST',
    data: params,
  });
}

export async function finishExpertList() {
  return request(`${config.domain}/finishCompetition`, {
    method: 'POST',
    data: {},
  });
}
