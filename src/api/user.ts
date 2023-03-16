import { API, ResponseAPI } from '@/api';
import { request } from '@@/plugin-request/request';

const UserURL: string = '/api/user/opt';
const UserPwdURL: string = '/api/user/setpassword';
const UserAvatarURL: string = '/api/file/avatar';
const DepartmentTagsURl: string = '/api/user/department/tags';
const PageDepartmentURL: string = '/api/user/department/page';
const DepartmentOptURL: string = '/api/user/department/opt';

const QueryUser: string = '/api/user/query';
const SearchUser: string = '/api/user/search';
const CurrentUser: string = '/api/user/current';

/** 登录接口 POST /user/login */
export async function login(
  body: API.ILoginParams,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>('/api/user/login', {
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
  return request<API.IResponse<any>>(QueryUser, {
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
  method: string,
  data?: API.IUser,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(UserURL, {
    method: method,
    data: data,
    ...(options || {}),
  });
}

export async function SetPwdServer(
  data: API.IPassword,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(UserPwdURL, {
    method: 'POST',
    data: data,
    ...(options || {}),
  });
}

/**
 * 部门查询
 * @param params
 * @param options
 */
export async function departmentPage(
  params?: API.ISearch,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<ResponseAPI.IDepartmentPage>>(
    PageDepartmentURL,
    {
      method: 'GET',
      params,
      ...(options || {}),
    },
  );
}

export async function departmentQuery(
  method: string,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<ResponseAPI.IDepartmentResponse[]>>(
    DepartmentOptURL,
    {
      method: method,
      ...(options || {}),
    },
  );
}

export async function departmentOpt(
  form: API.IDepartment,
  method: string,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<ResponseAPI.IDepartmentResponse[]>>(
    DepartmentOptURL,
    {
      method: method,
      data: form,
      ...(options || {}),
    },
  );
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
  return request<API.IResponse<any>>(DepartmentTagsURl, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

export async function uploadAvatar(
  file: any,
  options?: { [key: string]: any },
) {
  return request<API.IResponse<any>>(UserAvatarURL, {
    method: 'POST',
    data: file,
    requestType: 'form',
    ...(options || {}),
  });
}
