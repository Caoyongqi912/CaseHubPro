import React, { useRef } from 'react';
import HistoryTable from '@/pages/Report/History/component/HistoryTable';
import { pageInterfaceResult, pageInterfacesResult } from '@/api/interface';
import { message } from 'antd';

const Index = () => {
  const fetchData = async (params: any) => {
    console.log(params);
    const res = await pageInterfacesResult({ ...params });
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
  return <HistoryTable request={fetchData} title={'批量构建历史'} />;
};

export default Index;
