import { request } from 'umi';
import ex from 'umi/dist';

const UserURL: string = '/api/user/opt';
const UserAvatarURL: string = '/api/file/avatar';
const DepartmentTagsURl: string = '/api/user/department/tags';
const DepartmentURL: string = '/api/user/department/opt';
const QueryUser: string = '/api/user/query';
const SearchUser: string = '/api/user/search';
const CurrentUser: string = '/api/user/current';

/** 登录接口 POST /user/login */
export async function login(
  body: API.ILoginParams,
  options?: { [key: string]: any },
) {
  return request<API.IResponse>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{ data: API.IUser }>(CurrentUser, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 模糊搜索用户 GET /users */
export async function searchUser(
  body: API.IMoHuSearchUser,
  options?: { [key: string]: any },
) {
  return request<{ data: API.IUser[] }>(SearchUser, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** user GET /user */
export async function pageUser(
  params: API.ISearch,
  options?: { [key: string]: any },
) {
  return request<API.IResponse>(QueryUser, {
    method: 'GET',
    params: params,
    ...(options || {}),
  });
}

/**
 * 用户crud
 * @param data
 * @param method
 * @param options
 * @constructor
 */
export async function UserOpt(
  data: API.IUser,
  method: string,
  options?: { [key: string]: any },
) {
  return request<API.IResponse>(UserURL, {
    method: method,
    data: data,
    ...(options || {}),
  });
}

/**
 * 部门query
 * @param options
 * @constructor
 */
export async function departmentQuery(options?: { [key: string]: any }) {
  return request<API.IResponse>(DepartmentURL, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function addDepartmentInfo(
  body: API.IDepartment,
  options?: { [key: string]: any },
) {
  return request<API.IResponse>(DepartmentURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/**
 * tag
 * @param params
 * @param options
 * @constructor
 */
export async function userTagQuery(
  params: any,
  options?: { [key: string]: any },
) {
  return request<API.IResponse>(DepartmentTagsURl, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

export async function uploadAvatar(
  file: any,
  options?: { [key: string]: any },
) {
  return request<API.IResponse>(UserAvatarURL, {
    method: 'POST',
    data: file,
    requestType: 'form',
    ...(options || {}),
  });
}
