import { API } from '@/api';
import { request } from '@@/plugin-request/request';

const SettingUrl = '/cbs/cbs/perfSetting/v3';
const AddSign = '/cbs/cbs/sign';
const AddIntention = '/cbs/cbs/hz/intention';
const BuyApprove = '/cbs/cbs/perfBugApprove';
const PerfApprove = '/cbs/cbs/perfApprove';

interface IParams {
  city: string;
}

export async function getPerfSetting(params: IParams, options?: API.IObjGet) {
  console.log(params);
  return request<API.IResponse<[]>>(SettingUrl, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

export async function addSign(value: any, options?: API.IObjGet) {
  return request<API.IResponse<any>>(AddSign, {
    method: 'POST',
    data: value,
    ...(options || {}),
  });
}

export async function addIntention(value: any, options?: API.IObjGet) {
  return request<API.IResponse<any>>(AddIntention, {
    method: 'POST',
    data: value,
    ...(options || {}),
  });
}

export async function buyApprove(value: any, options?: API.IObjGet) {
  return request<API.IResponse<any>>(BuyApprove, {
    method: 'POST',
    data: value,
    ...(options || {}),
  });
}

export async function perfApprove(value: any, options?: API.IObjGet) {
  return request<API.IResponse<any>>(PerfApprove, {
    method: 'POST',
    data: value,
    ...(options || {}),
  });
}
