import { API } from '@/api';
import { request } from '@@/plugin-request/request';

const SettingUrl = '/api/cbs/perf/setting';

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
