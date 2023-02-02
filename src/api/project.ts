import { API } from '@/api';
import { request } from '@@/plugin-request/request';

const ProjectURL: string = '/api/project/opt';
const QueryProjectURL: string = '/api/project/queryProjects';
const AddUser2ProjectURL: string = '/api/project/addUser';
const ProjectInfoURL: string = '/api/project/info';
const ProjectUsersURL: string = '/api/project/users';

/** 项目 GET /project */
export async function pageProject(
  params?: API.ISearch,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(ProjectURL, {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

export async function queryProject(options?: { [key: string]: any }) {
  return request<API.IResponse<API.IProject[]>>(QueryProjectURL, {
    method: 'GET',
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
  return request<API.IResponse<any>>(ProjectURL, {
    method: method,
    data: data,
    ...(options || {}),
  });
}

/**
 * 项目详情
 * @param data uid
 * @param options
 */
export async function projectDetailInfo(
  data: API.IProject,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(ProjectInfoURL, {
    method: 'GET',
    params: data,
    ...(options || {}),
  });
}

export async function queryProjectUsers(
  data: API.IProject,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(ProjectUsersURL, {
    method: 'GET',
    params: data,
    ...(options || {}),
  });
}

export async function addUser2Project(
  data: any,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(AddUser2ProjectURL, {
    method: 'POST',
    data,
    ...(options || {}),
  });
}
