import request from 'umi-request';
// eslint-disable-next-line sort-imports
import config from '../../../utils/config';
// eslint-disable-next-line sort-imports
import fakeData from './_mock';

export async function queryCompetitionList() {
  if (config.manageCompetitionDebug) {
    return fakeData.fakeExpertListData;
  }
  return request(`${config.domain}/getCompetitionInfo`, {
    method: 'POST',
  });
}
