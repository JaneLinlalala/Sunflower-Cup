import config from '@/utils/config';
import request from 'umi-request';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function queryAdvancedProfile(params: any) {
  return request(`${config.domain}/api/ViewWorkInfoForJane`, {
    method: 'POST',
    data:params,
  });
}

export async function downloadZipFile() {
  return request('http://liuterry.cn:8080/api/DownloadPDF', {
    method: 'POST',
  });
}

export async function updateAppraise(params: {
  projectId: string;
  expertId: string;
  score: string;
  suggestion: string;
}) {
  if (config.expertJudgeDebug) {
    return 'success';
  }
  return request(`${config.domain}/saveJudgeDetail`, {
    method: 'POST',
    data: params,
  });
}

export async function getAppraise(params: { projectId: string; expertId: string }) {
  if (config.expertJudgeDebug) {
    return {
      score: 5,
      suggestion: 'hao',
    };
  }
  return request(`${config.domain}/getJudgeDetail`, {
    method: 'POST',
    data: params,
  });
}
