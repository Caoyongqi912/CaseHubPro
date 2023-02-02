import { API } from '@/api';
import { request } from '@@/plugin-request/request';

const HostUrl = '/api/case/host/opt';

/**
 * host 分页
 * @param params
 * @param options
 */
export async function pageHost(
  params: API.ISearch,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(HostUrl, {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

export async function hostOpt(
  method: string,
  params?: API.IHost,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(HostUrl, {
    method,
    data: params,
    ...(options || {}),
  });
}
