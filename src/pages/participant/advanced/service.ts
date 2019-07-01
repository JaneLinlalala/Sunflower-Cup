import request from 'umi-request';

export async function queryAdvancedProfile() {
  return request('http://liuterry.cn:8080/api/ViewWorkInfo', {
    method: 'POST',
    data:{"id":5}
  });
}

export async function downloadZipFile() {
  return request('http://liuterry.cn:8080/api/DownloadPDF', {
    method: 'POST',
  });
}
