import React, { useRef, useState } from 'react';
import { pageInterfaceResult } from '@/api/interface';
import { message, Tag } from 'antd';
import HistoryTable from '@/pages/Report/History/component/HistoryTable';
import { ProColumns } from '@ant-design/pro-components';
import Result from '@/pages/Case/CaseAPI/component/Result/Result';

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
      renderText: (text, record, index, action) => (
        <Tag color={'blue'}>{record.starterName}</Tag>
      ),
    },
    {
      title: '执行时间',
      dataIndex: 'create_time',
      renderText: (text, record, index, action) => (
        <Tag color={'blue'}>{record.create_time}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      renderText: (text, record, index, action) => (
        <Tag color={record.status === 'SUCCESS' ? 'green' : 'red'}>
          {record.status}
        </Tag>
      ),
    },
  ];

  return (
    <>
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
    </>
  );
};

export default Index;
