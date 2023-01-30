import { request } from '@@/plugin-request/request';
import { API } from '@/api';

const CasePartTreeUrl: string = '/api/case/part/query';
const CasePartOptUrl: string = '/api/case/part/opt';

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

/**
 * 添加casePart
 * @param body
 * @param options
 */
export async function addCasePart(
  body: API.ICasePart,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(CasePartOptUrl, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function putCasePart(
  body: API.ICasePart,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(CasePartOptUrl, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

export async function delCasePart(
  body: API.ICasePart,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(CasePartOptUrl, {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}
