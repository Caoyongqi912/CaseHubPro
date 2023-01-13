import React, { useEffect, useRef, useState } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import {
  EditableProTable,
  ProColumns,
  ProTable,
  RequestOptionsType,
} from '@ant-design/pro-components';
import { departmentQuery, pageUser, UserOpt, userTagQuery } from '@/api/user';
import { message } from 'antd';
import AddUser from '@/components/UserOpt/AddUser';

const Index: React.FC = () => {
  // const { initialState } = useModel("@@initialState");
  // const { currentUser } = initialState ?? {};
  const [tagEnum, setTagEnum] = useState({});
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
    ({ data } = await userTagQuery(id));
    let res = {};
    data.forEach((item) => {
      Object.defineProperty(res, item.id, { value: { text: item.name } });
    });
    setTagEnum(res);
    console.log('tagenum', tagEnum);
    return;
  };
  const actionRef = useRef<ActionType>(); //Table action 的引用，便于自定义触发
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
    },
    {
      title: 'tag',
      dataIndex: 'tagName',
      valueType: 'select',
      ellipsis: true, //是否自动缩略
      width: '10%',
      valueEnum: tagEnum,
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
      ],
    },
  ];

  return (
    <EditableProTable
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
        onValuesChange: async (record: API.IUser) => {
          await queryTagByDepartId({ id: record.departmentID });
        },

        onSave: async (key, record: API.IUser, originRow, newLineConfig) => {
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
          message.success(res.msg);
          return;
        },
        onDelete: async (key) => {
          const res = await UserOpt({ uid: key } as API.IUser, 'DELETE');
          message.success(res.msg);
          return;
        },
        onChange: () => {
          actionRef.current?.reload();
          return Promise.resolve();
        },
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage', //持久化列的类类型， localStorage 设置在关闭浏览器后也是存在的，sessionStorage 关闭浏览器后会丢失 sessionStorage
        onChange(value) {
          console.log('value: ', value);
        },
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
        // onChange: (page) => console.log(page)
      }}
      onSubmit={(params) => {
        console.log('submit', params);
      }}
      dateFormatter="string"
      headerTitle="User List"
      toolBarRender={() => [
        <AddUser reload={isReload} />,
        <a>添加部门</a>,
        <a>添加标签</a>,
      ]}
    />
  );
};

export default Index;
