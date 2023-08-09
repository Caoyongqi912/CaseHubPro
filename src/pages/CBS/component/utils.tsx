import React from 'react';
import { API } from '@/api';

const Utils = () => {
  const KeyTypes = [
    { label: '普通钥匙', value: '1' },
    { label: '密码钥匙', value: '2' },
  ];
  const BusinessType = [
    {
      label: '买卖',
      value: '2',
    },
    {
      label: '租赁',
      value: '1',
    },
  ];
  const CityBuildingName: API.IObjGet = {
    hangzhou: '远洋心里',
    beijing: '验真使用勿动',
  };
  const CityBuilder: API.IObjGet = {
    hangzhou: '374423',
    beijing: '8328780',
    shanghai: '608349',
    tianjin: '159017',
    taiyuan: '100943',
    suzhou: '631112',
    wuxi: '92812',
    zhengzhou: '8230831',
    nanjing: '568576',
  };
  const CityUser: API.IObjGet = {
    beijing: '625005',
    tianjin: '159017',
    taiyuan: '100943',
    zhengzhou: '8230831',
    hangzhou: '8355364',
    wuxi: '8171439',
    nanjing: '568576',
    shanghai: '608349',
  };
  const financeApprove: API.IObjGet = {
    beijing: '8128830',
    tianjin: '141716',
    zhengzhou: '8315796',
    hangzhou: '59532',
    wuxi: '8116827',
    nanjing: null,
    shanghai: null,
  };
  const cityList: { label: string; value: string }[] = [
    {
      label: '北京',
      value: 'beijing',
    },
    {
      label: '郑州',
      value: 'zhengzhou',
    },
    {
      label: '无锡',
      value: 'wuxi',
    },
    {
      label: '南京',
      value: 'nanjing',
    },
    {
      label: '上海',
      value: 'shanghai',
    },
    {
      label: '太原',
      value: 'taiyuan',
    },
    {
      label: '天津',
      value: 'tianjin',
    },
    {
      label: '杭州',
      value: 'hangzhou',
    },
  ];
  return {
    CityUser,
    cityList,
    financeApprove,
    CityBuildingName,
    CityBuilder,
    BusinessType,
    KeyTypes,
  };
};

export default Utils;
