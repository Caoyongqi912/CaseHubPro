import { API } from '@/api';
import { request } from '@@/plugin-request/request';

const SettingUrl = '/cbs/cbs/perfSetting/v3';
const AddSign = '/cbs/cbs/sign';
const BuyApprove = '/cbs/cbs/perfBugApprove';
const PerfApprove = '/cbs/cbs/perfApprove';
const Collect = '/cbs/cbs/finance';
const AddShowing = '/cbs/cbs/addShowing';
const AddLease = '/cbs/cbs/addLease';

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

export async function collect(value: any, options?: API.IObjGet) {
  return request<API.IResponse<any>>(Collect, {
    method: 'POST',
    data: value,
    ...(options || {}),
  });
}

export async function addShowing(value: any, options?: API.IObjGet) {
  return request<API.IResponse<any>>(AddShowing, {
    method: 'POST',
    data: value,
    ...(options || {}),
  });
}

export async function addLease(value: any, options?: API.IObjGet) {
  return request<API.IResponse<any>>(AddLease, {
    method: 'POST',
    data: value,
    ...(options || {}),
  });
}
