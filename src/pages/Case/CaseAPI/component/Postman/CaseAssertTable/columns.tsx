import { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';

const ExtraOpt = {
  jsonpath: {
    text: 'jsonpath',
  },
  re: {
    text: 're',
  },
};

const AssertOpt = {
  '==': {
    text: '相等',
  },
  '!=': {
    text: '不等',
  },
  '>': {
    text: '大于',
  },
  '>=': {
    text: '大于等于',
  },
  '<=': {
    text: '小于等于',
  },
  in: {
    text: '存在',
  },
  notIn: {
    text: '不存在',
  },
};

export const assertColumns: ProColumns[] = [
  {
    title: '提取方式',
    dataIndex: 'extraOpt',
    valueEnum: ExtraOpt,
    valueType: 'select',
  },
  {
    title: '提取语法',
    dataIndex: 'extraValue',
    valueType: 'text',
  },
  {
    title: '断言方法',
    dataIndex: 'assertOpt',
    valueType: 'select',
    valueEnum: AssertOpt,
  },
  {
    title: '预期结果',
    dataIndex: 'expect',
    valueType: 'text',
  },
  {
    title: '操作',
    valueType: 'option',
  },
];
