import { request } from '@@/plugin-request/request';
import { API } from '@/api';

const CasePartTreeUrl: string = '/api/case/part/query';

interface ICasePartTree {
  projectID: number;
}

export async function casePartTree(
  params?: ICasePartTree,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(CasePartTreeUrl, {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}
