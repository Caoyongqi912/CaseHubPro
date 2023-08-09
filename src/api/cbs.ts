import { API } from '@/api';
import { request } from '@@/plugin-request/request';

const SettingUrl = '/api/cbs/perfSetting/v3';
const AddSign = '/api/cbs/sign';
const BuyApprove = '/api/cbs/perfBugApprove';
const PerfApprove = '/api/cbs/perfApprove';
const Collect = '/api/cbs/finance';
const AddShowing = '/api/cbs/customer/addShowing';
const AddProxy = '/api/cbs/customer/addProxy';
const AddLease = '/api/cbs/addLease';
const CountInfo = '/api/cbs/structure/count';
const SelectBuild = '/api/cbs/structure/house/selectBuild';
const GetBuildInfo = '/api/cbs/structure/house/getBuildInfo';
const NewKey = '/api/cbs/structure/house/newKey';
const NewProxy = '/api/cbs/structure/house/newProxy';
const InsertHouse = '/api/cbs/structure/house/insert';

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

export interface IAddShowing {
  city: string;
  userId: string;
  houseID?: string;
  businessTypeID: string;
}

export async function addShowing(value: IAddShowing, options?: API.IObjGet) {
  return request<API.IResponse<any>>(AddShowing, {
    method: 'POST',
    data: value,
    ...(options || {}),
  });
}

export interface IAddCProxy {
  city: string;
  userId: string;
  clientId?: string;
  start_time: string;
  businessType: number;
  end_time: string;
}

export async function addCProxy(value: IAddCProxy, options?: API.IObjGet) {
  return request<API.IResponse<any>>(AddProxy, {
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

export async function countInfo(options?: API.IObjGet) {
  return request<API.IResponse<any>>(CountInfo, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function selectHouseBuild(
  value: { buildName: string; city: string; username: string },
  options?: API.IObjGet,
) {
  return request<API.IResponse<any>>(SelectBuild, {
    method: 'GET',
    params: value,
    ...(options || {}),
  });
}

export async function getBuildInfo(
  value: { id: string; city: string; username: string; n: string },
  options?: API.IObjGet,
) {
  return request<API.IResponse<any>>(GetBuildInfo, {
    method: 'GET',
    params: value,
    ...(options || {}),
  });
}

export interface AddKeyType {
  city: string;
  userId: string;
  houseId: string;
  keyType: string;
  approve: boolean;
  start_time: string;
  end_time: string;
  businessType: string;
}

export async function addKey(value: AddKeyType, options?: API.IObjGet) {
  return request<API.IResponse<any>>(NewKey, {
    method: 'POST',
    data: value,
    ...(options || {}),
  });
}

export interface AddProxyType {
  city: string;
  userId: string;
  houseId: string;
  start_time?: string;
  end_time?: string;
  floor: string;
  area: string;
  price: string;
  approve: boolean;
  businessType: string;
}

export async function addProxy(value: AddProxyType, options?: API.IObjGet) {
  return request<API.IResponse<any>>(NewProxy, {
    method: 'POST',
    data: value,
    ...(options || {}),
  });
}

export interface InsertHouseType {
  city: string;
  username: string;
  builder: string;
  buildingName: string;
  houseOwn: string;
  name: string;
  phone: string;
  businessType: string;
}

export async function insertHouse(
  value: InsertHouseType,
  options?: API.IObjGet,
) {
  return request<API.IResponse<any>>(InsertHouse, {
    method: 'POST',
    data: value,
    ...(options || {}),
  });
}
