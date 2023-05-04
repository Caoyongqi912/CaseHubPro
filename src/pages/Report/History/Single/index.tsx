import React, { useRef } from 'react';
import { pageInterfaceResult } from '@/api/interface';
import { API } from '@/api';
import { message } from 'antd';
import HistoryTable from '@/pages/Report/History/component/HistoryTable';

const Index = () => {
  const fetchData = async (params: any) => {
    console.log(params);
    const res = await pageInterfaceResult({ ...params });
    if (res.code === 0) {
      return {
        data: res.data.items,
        total: res.data.pageInfo.total,
        success: true,
        pageSize: res.data.pageInfo.page,
        current: res.data.pageInfo.limit,
      };
    } else {
      message.error(res.msg);
      return {
        success: false,
      };
    }
  };
  return <HistoryTable request={fetchData} title={'单构建历史'} />;
};

export default Index;
