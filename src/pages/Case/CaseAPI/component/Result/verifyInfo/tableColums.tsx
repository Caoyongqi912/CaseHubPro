import { ColumnsType } from 'antd/es/table';
import { ResponseAPI } from '@/api';
import React from 'react';
import { Tag } from 'antd';

const columns: ColumnsType<ResponseAPI.IVerify> = [
  {
    title: '预计结果',
    dataIndex: 'expect',
    key: 'expect',
    render: (text) => <p>{text}</p>,
  },
  {
    title: '实际结果',
    dataIndex: 'actual',
    key: 'actual',
    render: (text) => <p>{text}</p>,
  },
  {
    title: '提取',
    dataIndex: 'extraOpt',
    key: 'extraOpt',
    render: (text) => <p>{text}</p>,
  },
  {
    title: '语法',
    dataIndex: 'extraValue',
    key: 'extraValue',
    render: (text) => <p>{text}</p>,
  },
  {
    title: '测试结果',
    dataIndex: 'result',
    key: 'result',
    render: (text) => (
      <Tag color={text ? 'green' : 'volcano'}>{text ? 'SUCCESS' : 'FAIL'}</Tag>
    ),
  },
];

export default columns;
