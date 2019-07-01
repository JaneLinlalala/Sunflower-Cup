import request from 'umi-request';
// eslint-disable-next-line sort-imports
import { StepFormProps } from './index';

export async function Submit(params: StepFormProps) {
  return request('http://liuterry.cn:8080/api/UpdateWork', {
    method: 'POST',
    data: params,
  });
}
