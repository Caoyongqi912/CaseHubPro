import { request } from '@@/plugin-request/request';
import { API, ResponseAPI } from '@/api';

const CasePartTreeUrl: string = '/api/case/part/query';
const CasePartOptUrl: string = '/api/case/part/opt';
const CaseAPIOptURl: string = '/api/case/interface/opt';
const QueryCaseAPIByCasePartID: string = '/api/case/part/interfaces';
const PageCaseAPI = '/api/case/interface/page';
const RunApiDemoURL = '/api/case/interface/demo';
const RunApiURL = '/api/case/interface/run';
const RunApisURL = '/api/case/interfaces/run';
const PageApisResultURL = '/api/case/interfaces/result/page';
const PageApiResultURL = '/api/case/interface/result/page';
const GetApiResponseURL = '/api/case/interface/response';
const GetInterfacesResultInfoURL = '/api/case/interfaces/report/info';

interface ICasePartTree {
  projectID: number;
}

export async function casePartTree(
  params?: ICasePartTree,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<ResponseAPI.IQueryPartTree[]>>(CasePartTreeUrl, {
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

export async function runApiDemo(body: any, options?: { [key: string]: any }) {
  return request<API.IResponse<any>>(RunApiDemoURL, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

interface DetailParams {
  uid: string;
}

export async function getApiDetail(
  params: DetailParams,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<API.IInterfaceDetail>>(CaseAPIOptURl, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

export async function putApi(
  params: API.IInterfaceDetail,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<null>>(CaseAPIOptURl, {
    method: 'PUT',
    data: params,
    ...(options || {}),
  });
}

export async function runApi(
  body: DetailParams,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<string>>(RunApiURL, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

export async function getApiResponse(
  params: DetailParams,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<ResponseAPI.IApiResponse>>(GetApiResponseURL, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

interface runInterfaceGroupData {
  interfaceIDs: string[];
}

export async function runInterfaceGroup(
  data: runInterfaceGroupData,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(RunApisURL, {
    method: 'POST',
    data,
    ...(options || {}),
  });
}

/**
 * 单个构建历史分页
 * @param params
 * @param options
 */
export async function pageInterfaceResult(
  params: {
    uid?: string;
    starterName?: string;
    create_time?: string;
    status?: string;
  },
  options?: {
    [key: string]: any;
  },
) {
  return request<API.IResponse<any>>(PageApiResultURL, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/**
 * 多个构建历史分页
 * @param params
 * @param options
 */
export async function pageInterfacesResult(
  params: {
    uid?: string;
    starterName?: string;
    create_time?: string;
    status?: string;
  },
  options?: {
    [key: string]: any;
  },
) {
  return request<API.IResponse<any>>(PageApisResultURL, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

export async function getInterfacesResultInfo(
  params: {
    uid: string;
  },
  options?: {
    [key: string]: any;
  },
) {
  return request<API.IResponse<any>>(GetInterfacesResultInfoURL, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}
