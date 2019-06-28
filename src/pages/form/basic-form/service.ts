import request from 'umi-request';

export async function fakeSubmitForm(params: any) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}
export async function test(params: any) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}
