import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import AddDepartment from '@/components/UserOpt/AddDepartment';
import { departmentOpt, departmentPage, UserOpt } from '@/api/user';
import { API } from '@/api';
import { message, Tag } from 'antd';

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
      ellipsis: true,
      render: (text) => {
        return <Tag color={'blue'}>{text}</Tag>;
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
          onClick={() => {
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
          const res = await departmentPage(params as API.ISearch);
          return {
            data: res.data.items,
            total: res.data.pageInfo.total,
            success: true,
            pageSize: res.data.pageInfo.page,
            current: res.data.pageInfo.limit,
          };
        }}
        editable={{
          type: 'single',
          onSave: async (key, record: API.IDepartment) => {
            const form = {
              uid: record.uid,
              name: record.name,
              desc: record.desc,
              adminID: record.adminID,
            };
            await departmentOpt(form, 'PUT');
            return;
          },
          onDelete: async (key) => {
            const res = await departmentOpt(
              { uid: key } as API.IDepartment,
              'DELETE',
            );
            message.success(res.msg);
            return;
          },
          onChange: () => {
            actionRef.current?.reload();
            return Promise.resolve();
          },
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
