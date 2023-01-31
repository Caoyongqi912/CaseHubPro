import React, { useRef, useState } from 'react';
import type {
  ActionType,
  EditableFormInstance,
  ProFieldRequestData,
} from '@ant-design/pro-components';
import {
  EditableProTable,
  ProColumns,
  ProTable,
  RequestOptionsType,
} from '@ant-design/pro-components';
import { departmentQuery, pageUser, UserOpt, userTagQuery } from '@/api/user';
import { message } from 'antd';
import AddUser from '@/components/UserOpt/AddUser';
import AddDepartment from '@/components/UserOpt/AddDepartment';
import { PageContainer } from '@ant-design/pro-layout';

interface Tags {
  name: string;
  id: number;
}

const Index: React.FC = () => {
  const [tags, setTags] = useState<RequestOptionsType[]>([]);
  const editableFormRef = useRef<EditableFormInstance>();
  const actionRef = useRef<ActionType>(); //Table action 的引用，便于自定义触发

  const queryDepartments = async () => {
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
  };
  const queryTagByDepartId = async (id: API.IQueryDepartmentTags) => {
    let data: any;
    ({ data } = await userTagQuery({ id: id }));
    if (data === null) {
      message.error('err');
      return;
    }
    const res: RequestOptionsType[] = [];
    data.forEach((item: Tags) => {
      res.push({ label: item.name, value: item.name });
    });
    setTags(res);
    return;
  };

  const isReload = (value: boolean) => {
    if (value) {
      actionRef.current?.reload();
    }
  };
  const columns: ProColumns[] = [
    {
      title: 'username',
      copyable: true,
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
      title: 'department',
      dataIndex: 'departmentID',
      valueType: 'select',
      ellipsis: true, //是否自动缩略
      width: '10%',
      request: queryDepartments,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      fieldProps: (_, { rowIndex }) => {
        return {
          onChange: (value: API.IQueryDepartmentTags) => {
            editableFormRef.current?.setRowData?.(rowIndex, { tagName: [] });
            queryTagByDepartId(value);
          },
          onSelect: (value: API.IQueryDepartmentTags) => {
            editableFormRef.current?.setRowData?.(rowIndex, { tagName: [] });
            queryTagByDepartId(value);
          },
        };
      },
    },
    {
      title: 'tag',
      dataIndex: 'tagName',
      valueType: 'select',
      ellipsis: true, //是否自动缩略
      fieldProps: {
        options: tags,
      },
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
            if (record.departmentID) {
              queryTagByDepartId(record.departmentID);
            }
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
        cardBordered
        request={async (params) => {
          const res: any = await pageUser(params as API.ISearch);
          return {
            data: res.data.items,
            total: res.data.pageInfo.total,
            success: res.msg,
            pageSize: res.data.pageInfo.page,
            current: res.data.pageInfo.limit,
          };
        }}
        editable={{
          type: 'single',
          onSave: async (key, record: API.IUser) => {
            const form = {
              uid: record.uid,
              username: record.username,
              email: record.email,
              phone: record.phone,
              departmentID: record.departmentID,
              tagName: record.tagName,
              gender: record.gender,
            };
            const res = await UserOpt(form, 'PUT');
            return;
          },
          onDelete: async (key) => {
            const res = await UserOpt({ uid: key } as API.IUser, 'DELETE');
            message.success(res.msg);
            return;
          },
          onChange: () => {
            actionRef.current?.reload();
            setTags([]);

            return Promise.resolve();
          },
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage', //持久化列的类类型， localStorage 设置在关闭浏览器后也是存在的，sessionStorage 关闭浏览器后会丢失 sessionStorage
        }}
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
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="User List"
        toolBarRender={() => [
          <AddUser reload={isReload} />,
          <AddDepartment reload={isReload} />,
        ]}
      />
    </PageContainer>
  );
};

export default Index;
