import { ProColumns } from '@ant-design/pro-components';
import { CONFIG } from '@/utils/config';
import { Tag } from 'antd';
import React from 'react';

const ExtractColumns: ProColumns[] = [
  {
    title: '变量名',
    dataIndex: 'key',
  },
  {
    title: '提取目标',
    dataIndex: 'target',
    valueType: 'select',
    valueEnum: CONFIG.EXTRACT_TARGET_ENUM,
    render: (text) => {
      return <Tag color={'blue'}>{text}</Tag>;
    },
  },
  {
    title: '提取语法',
    dataIndex: 'val',
  },
  {
    title: 'Opt',
    valueType: 'option',
  },
];

export default ExtractColumns;
