import React, { useRef, useState } from 'react';
import type {
  ActionType,
  EditableFormInstance,
} from '@ant-design/pro-components';
import {
  ProColumns,
  ProTable,
  RequestOptionsType,
} from '@ant-design/pro-components';
import { departmentQuery, pageUser, UserOpt, userTagQuery } from '@/api/user';
import { message, Tag } from 'antd';
import AddUser from '@/components/UserOpt/AddUser';
import { PageContainer } from '@ant-design/pro-layout';
import { API } from '@/api';

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
    ({ data } = await departmentQuery('GET'));
    const res: RequestOptionsType[] = [];
    data.forEach((item: API.IDepartment) => {
      res.push({
        label: item.name,
        value: item.id,
        id: item.id,
      });
    });
    return res;
  };
  const queryTagByDepartId = async (id: number) => {
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
      dataIndex: 'departmentName',
      valueType: 'select',
      ellipsis: true, //是否自动缩略
      width: '10%',
      request: queryDepartments,
      fieldProps: (_, { rowIndex }) => {
        return {
          onChange: async (value: number) => {
            console.log('onChange == ', value);
            editableFormRef.current?.setRowData?.(rowIndex, { tagName: [] });
            if (value) {
              editableFormRef.current?.setRowData?.(rowIndex, {
                departmentID: value,
              });
              await queryTagByDepartId(value);
            }
          },
        };
      },
    },
    {
      title: 'departmentID',
      dataIndex: 'departmentID',
      hideInTable: true,
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
            console.log('editable == ', record);
            const form = {
              uid: record.uid,
              username: record.username,
              email: record.email,
              phone: record.phone,
              departmentID: record.departmentID,
              tagName: record.tagName,
              gender: record.gender,
            };
            await UserOpt('PUT', form);
            return;
          },
          onDelete: async (key) => {
            const res = await UserOpt('DELETE', { uid: key } as API.IUser);
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
        toolBarRender={() => [<AddUser reload={isReload} />]}
      />
    </PageContainer>
  );
};

export default Index;
