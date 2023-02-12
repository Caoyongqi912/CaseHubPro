import { API } from '@/api';
import { Select } from 'antd';
import { CONFIG } from '@/utils/config';
import React from 'react';
const { Option } = Select;

const caseInfo: API.IAPICaseInfoForm[] = [
  {
    name: 'title',
    label: '用例名称',
    required: true,
    message: '请输入用例名称',
    type: 'input',
    placeholder: '请输入用例名称',
    component: null,
    span: 8,
  },
  {
    name: 'level',
    label: '优先级',
    required: true,
    component: (
      <Select placeholder="请选择用例优先级">
        {CONFIG.CASE_LEVEL.map((v) => (
          <Option key={v} value={v}>
            {v}
          </Option>
        ))}
      </Select>
    ),
    default: 'P1',
    type: 'select',
    span: 8,
  },
  {
    name: 'status',
    label: '用例状态',
    required: true,
    component: (
      <Select placeholder="请选择用例当前状态">
        {Object.keys(CONFIG.CASESTATUS).map((key, value) => (
          <Option key={key} value={key}>
            {/*// @ts-ignore*/}
            {CONFIG.CASESTATUS[key]}
          </Option>
        ))}
      </Select>
    ),
    type: 'select',
    default: 'DEBUG',

    span: 8,
  },
  {
    name: 'http',
    label: '请求类型',
    required: true,
    component: (
      <Select placeholder="请选择请求协议类型">
        {Object.keys(CONFIG.REQUEST_TYPE).map((key) => (
          <Option key={key} value={key} disabled={key !== '1'}>
            {/*// @ts-ignore*/}
            {CONFIG.REQUEST_TYPE[key]}
          </Option>
        ))}
      </Select>
    ),
    type: 'select',
    default: 'HTTP',
    span: 8,
  },
  {
    name: 'desc',
    label: '描述',
    required: false,
    component: null,
    type: 'textarea',
    span: 8,
  },
];

export default caseInfo;
