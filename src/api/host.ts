import { API, ResponseAPI } from '@/api';
import { request } from '@@/plugin-request/request';

const HostUrl = '/api/case/host/opt';
const QueryHostUrl = '/api/case/host/query';

/**
 * host 分页
 * @param params
 * @param options
 */
export async function pageHost(params: API.ISearch, options?: API.IObjGet) {
  return request<API.IResponse<ResponseAPI.IPageHost>>(HostUrl, {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

export async function hostOpt(
  method: string,
  params?: API.IHost,
  options?: API.IObjGet,
) {
  return request<API.IResponse<null>>(HostUrl, {
    method,
    data: params,
    ...(options || {}),
  });
}

export async function queryHost(options?: API.IObjGet) {
  return request<API.IResponse<ResponseAPI.IQueryHost[]>>(QueryHostUrl, {
    ...(options || {}),
  });
}
