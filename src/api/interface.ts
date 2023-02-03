import { request } from '@@/plugin-request/request';
import { API } from '@/api';

const CasePartTreeUrl: string = '/api/case/part/query';
const CasePartOptUrl: string = '/api/case/part/opt';
const CaseAPIOptURl: string = '/api/case/interface/opt';
const QueryCaseAPIByCasePartID: string = '/api/case/part/interfaces';
const PageCaseAPI = '/api/case/interface/page';

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

export async function addApiCase(
  body: API.IInterface,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(CaseAPIOptURl, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

interface queryApiCaseByCasePartIDParams {
  casePartID: number;
}

export async function queryApiCaseByCasePartID(
  params: queryApiCaseByCasePartIDParams,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(QueryCaseAPIByCasePartID, {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

interface delApiCaseBody {
  uid: string;
}

export async function delApiCase(
  body: delApiCaseBody,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(CaseAPIOptURl, {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}

export async function pageApiCase(
  params: API.ISearch,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(PageCaseAPI, {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}
