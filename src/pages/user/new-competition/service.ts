import request from 'umi-request';
import { NewCompetitionParams } from './index';

export async function NewCompetitionSubmit(params: NewCompetitionParams) {
  return request('http://liuterry.cn:8080/addCompetition', {
    method: 'POST',
    data: params,
  });
}