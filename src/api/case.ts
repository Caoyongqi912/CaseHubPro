import { API } from '@/api';
import { request } from '@@/plugin-request/request';

const PageCaseURl: string = '/api/case/page';
const AddCaseURl: string = '/api/case/opt';

/**
 * case 分页
 * @param params
 * @param options
 */
export async function pageCases(params: any, options?: { [key: string]: any }) {
  return request<API.IResponse<any>>(PageCaseURl, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

export async function addCases(body: any, options?: { [key: string]: any }) {
  return request<API.IResponse<any>>(AddCaseURl, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
