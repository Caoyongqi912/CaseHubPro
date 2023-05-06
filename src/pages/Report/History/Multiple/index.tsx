import React, { useRef } from 'react';
import HistoryTable from '@/pages/Report/History/component/HistoryTable';
import { pageInterfacesResult } from '@/api/interface';
import { message } from 'antd';
import { ProColumns } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { history } from '@@/core/history';

const Index = () => {
  /**
   * 数据请求
   * @param params
   */
  const fetchData = async (params: any) => {
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

  const columns: ProColumns[] = [
    {
      title: 'UID',
      dataIndex: 'uid',
      ellipsis: true,
      renderText: (text, record, index, action) => (
        <a
          onClick={() => {
            history.push(`/report/history/detail/uid=${record.uid}`);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: '执行人',
      dataIndex: 'starterName',
    },
    {
      title: '执行时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
  ];

  return (
    <PageContainer title={false}>
      <HistoryTable
        request={fetchData}
        title={'批量构建历史'}
        columns={columns}
      />
    </PageContainer>
  );
};

export default Index;
