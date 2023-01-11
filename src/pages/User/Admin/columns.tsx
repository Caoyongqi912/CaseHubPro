import { ProColumns, RequestOptionsType } from '@ant-design/pro-components';
import { departmentQuery, userTagQuery } from '@/api/user';
import React from 'react';

const columns: ProColumns[] = [
  {
    title: 'username',
    dataIndex: 'username',
    ellipsis: true, //是否自动缩略
    width: '10%',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: 'department',
    dataIndex: 'departmentID',
    valueType: 'select',
    ellipsis: true, //是否自动缩略
    width: '10%',
    request: async () => {
      let data: any;
      ({ data } = await departmentQuery());
      const res: RequestOptionsType[] = [];
      data.forEach((item: API.IDepartment) => {
        res.push({
          label: item.name,
          value: item.id,
        });
      });

      return res;
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: 'email',
    dataIndex: 'email',
    ellipsis: true, //是否自动缩略
    width: '10%',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: 'tag',
    dataIndex: 'tagName',
    ellipsis: true, //是否自动缩略
    width: '10%',
    request: async () => {
      let data: any;
      ({ data } = await userTagQuery());
      const res: RequestOptionsType[] = [];
      data.forEach((item: any) => {
        res.push({
          label: item.name,
          value: item.name,
        });
      });

      return res;
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: 'phone',
    dataIndex: 'phone',
    ellipsis: true, //是否自动缩略
    width: '10%',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: 'gender',
    dataIndex: 'gender',
    ellipsis: true, //是否自动缩略
    width: '10%',
    valueEnum: {
      MALE: {
        text: 'MALE',
      },
      FEMALE: {
        text: 'FEMALE',
      },
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'create_time',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '更新时间',
    key: 'showTime',
    dataIndex: 'update_time',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
    editable: false,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={async () => {
          action?.startEditable?.(record.uid);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
    ],
  },
];

export default columns;
