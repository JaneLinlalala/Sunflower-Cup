import request from 'umi-request';
import { NewCompetitionParams } from './index';

export async function Register(params: NewCompetitionParams) {
  return request('http://liuterry.cn:8080/studentReg/', {
    method: 'POST',
    data: params,
  });
}
