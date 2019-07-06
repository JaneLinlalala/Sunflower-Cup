import request from 'umi-request';
// eslint-disable-next-line sort-imports
import config from '../../../utils/config';
// eslint-disable-next-line sort-imports
import { fakeData, fakeExpertListData } from './_mock';

export async function queryCompetitionList( payload ) {
  const ma = false;
  if (ma) {
    return fakeExpertListData;
  }
  return request(`${config.domain}/getCompetitionResult`, {
    method: 'POST',
    data: payload,
  });
}

export async function queryCompetitionState( payload ) {
  const ma = false;
  if (ma) {
    return fakeData;
  }
  console.log(payload);
  return request(`${config.domain}/getCompetitionState`, {
    method: 'POST',
    data: {
      id: payload,
    },
  });
}

