import request from 'umi-request';
import { BasicListItemDataType } from './data.d';
import config from '@/utils/config';

interface ParamsType extends Partial<BasicListItemDataType> {
  count?: number;
}

export async function queryFakeList(params) {
  return request(`${config.domain}/getJudgeListForExpert`, {
    method: 'POST',
    data:params,
  });
}

export async function submitFakeList(params) {
  return request(`${config.domain}/finishJudge`, {
    method: 'POST',
    data: params,
  });
}
