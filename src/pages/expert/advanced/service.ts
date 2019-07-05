import request from 'umi-request';
import config from '@/utils/config';

export async function queryAdvancedProfile(params) {
  return request(`${config.domain}/api/ViewWorkInfo`, {
    method: 'POST',
    data:params.payload,
  });
}

export async function downloadZipFile() {
  return request('http://liuterry.cn:8080/api/DownloadPDF', {
    method: 'POST',
  });
}
