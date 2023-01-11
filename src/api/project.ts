import { request } from '@@/plugin-request/request';

const ProjectURL: string = '/api/project/opt';

/** 项目 GET /project */
export async function pageProject(
  params: API.ISearch,
  options?: { [key: string]: any },
) {
  return request<API.IResponse>(ProjectURL, {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

/**
 * 项目 rud
 * @param data 请求参数
 * @param method 请求方法
 * @param options 其他配置
 */
export async function projectOpt(
  data: API.INewOrUpdateProject,
  method: string,
  options?: { [key: string]: any },
) {
  return request<API.IResponse>(ProjectURL, {
    method: method,
    data: data,
    ...(options || {}),
  });
}
