import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {
  ActionType,
  ProColumns,
  ProTable,
  RequestOptionsType,
} from '@ant-design/pro-components';
import AddUser from '@/components/UserOpt/AddUser';
import AddDepartment from '@/components/UserOpt/AddDepartment';
import { departmentQuery } from '@/api/user';

const DepartmentOpt = () => {
  const actionRef = useRef<ActionType>(); //Table action 的引用，便于自定义触发
  const isReload = (value: boolean) => {
    if (value) {
      actionRef.current?.reload();
    }
  };

  const columns: ProColumns[] = [
    {
      title: '部门名称',
      dataIndex: 'name',
      ellipsis: true, //是否自动缩略
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
      title: '部门描述',
      dataIndex: 'desc',
      ellipsis: true, //是否自动缩略
    },
    {
      title: '部门负责人',
      dataIndex: 'adminName',
      ellipsis: true, //是否自动缩略
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
          onClick={() => {
            // if (record.departmentID) {
            //   queryTagByDepartId(record.departmentID);
            // }
            action?.startEditable?.(record.uid);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];
  return (
    <PageContainer title={false}>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params) => {
          const res = await departmentQuery(params as API.ISearch);
          return {
            data: res.data.items,
            total: res.data.pageInfo.total,
            success: res.msg,
            pageSize: res.data.pageInfo.page,
            current: res.data.pageInfo.limit,
          };
        }}
        cardBordered
        rowKey="uid"
        search={{
          labelWidth: 'auto',
          span: 6,
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
          reload: true,
        }}
        dateFormatter="string"
        headerTitle="Department List"
        toolBarRender={() => [<AddDepartment reload={isReload} />]}
      />
    </PageContainer>
  );
};

export default DepartmentOpt;
