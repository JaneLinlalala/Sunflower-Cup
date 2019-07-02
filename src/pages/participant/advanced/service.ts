import request from 'umi-request';

export async function queryAdvancedProfile() {
  return request('http://liuterry.cn:8080/api/ViewWorkInfo', {
    method: 'POST',
    headers: {
      cookies: "4ed3b26bf9a440fdbeb6dd9c266fc901",
    },
    data:{"id":5}
  });
}

export async function downloadZipFile() {
  return request('http://liuterry.cn:8080/api/DownloadPDF', {
    method: 'POST',
    headers: {
      cookies: "4ed3b26bf9a440fdbeb6dd9c266fc901",
    },
    data:{"id":5}
  });
}
