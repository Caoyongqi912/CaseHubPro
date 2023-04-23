import { API } from '@/api';
import { request } from '@@/plugin-request/request';

const PageCaseURl: string = '/api/case/page';

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
