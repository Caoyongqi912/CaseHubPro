import React, { useRef, useState } from 'react';
import { pageInterfaceResult } from '@/api/interface';
import { message } from 'antd';
import HistoryTable from '@/pages/Report/History/component/HistoryTable';
import { PageLoading, ProColumns } from '@ant-design/pro-components';
import Result from '@/pages/Case/CaseAPI/component/Result/Result';
import { PageContainer } from '@ant-design/pro-layout';

const Index = () => {
  const [resultModal, setResultModal] = useState<boolean>(false);
  const [result, setResult] = useState();
  /**
   * 数据请求
   * @param params
   */
  const fetchData = async (params: any) => {
    const { code, data, msg } = await pageInterfaceResult({ ...params });
    if (code === 0) {
      return {
        data: data.items,
        total: data.pageInfo.total,
        success: true,
        pageSize: data.pageInfo.page,
        current: data.pageInfo.limit,
      };
    } else {
      message.error(msg);
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
            console.log(record);
            setResult(record);
            setResultModal(true);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: '执行用例',
      dataIndex: 'interfaceName',
      renderText: (text, record, index, action) => (
        <a
          onClick={() => {
            console.log(record);
            setResult(record);
            setResultModal(true);
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
      <Result
        modal={resultModal}
        setModal={setResultModal}
        single={false}
        result={result}
      />
      <HistoryTable
        request={fetchData}
        title={'单个构建历史'}
        columns={columns}
      />
    </PageContainer>
  );
};

export default Index;
