import { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';

export const TargetEnum = {
  response: {
    text: 'response',
  },
  headers: {
    text: 'headers',
  },
};

export const ExtraOpt = {
  jsonpath: {
    text: 'jsonpath',
  },
  re: {
    text: 're',
  },
};

export const AssertOpt = {
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
    title: 'target',
    dataIndex: 'target',
    valueEnum: TargetEnum,
    valueType: 'select',
  },
  {
    title: 'extraOpt',
    dataIndex: 'extraOpt',
    valueEnum: ExtraOpt,
    valueType: 'select',
  },
  {
    title: 'assertValue',
    dataIndex: 'assertValue',
    valueType: 'text',
  },
  {
    title: 'assertOpt',
    dataIndex: 'assertOpt',
    valueType: 'select',
    valueEnum: AssertOpt,
  },
  {
    title: 'actual',
    dataIndex: 'actual',
    valueType: 'text',
  },
  {
    title: '操作',
    valueType: 'option',
  },
];
