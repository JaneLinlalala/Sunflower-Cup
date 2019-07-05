import request from 'umi-request';
import config from '@/utils/config';

export async function newCompetitionSubmit(params: any) {
  return request(`${config.domain}/addCompetition`, {
    method: 'POST',
    data: params,
  });
}

export async function updateCompetitionSubmit(params: any) {
  console.log('params', params);
  return request(`${config.domain}/updateCompetitionInfo`, {
    method: 'POST',
    data: params,
  });
}
