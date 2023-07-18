import React from 'react';
import { API } from '@/api';

const Utils = () => {
  const CityUser: API.IObjGet = {
    beijing: '670545',
    tianjin: '8223429',
    zhengzhou: '8230831',
    hangzhou: '8355364',
    wuxi: '8171439',
    nanjing: '8147211',
    shanghai: null,
  };
  const financeApprove: API.IObjGet = {
    beijing: '625005',
    tianjin: '141716',
    zhengzhou: '8315796',
    hangzhou: null,
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
  return { CityUser, cityList, financeApprove };
};

export default Utils;
