import request from 'umi-request';
import { StepFormProps } from './index';

export async function Submit(params: StepFormProps) {
  return request('http://liuterry.cn:8080/api/UpdateWork', {
    method: 'POST',
    headers: {
      cookies: "4ed3b26bf9a440fdbeb6dd9c266fc901",
    },
    data:params,
  });
}
