import React, { useRef } from 'react';
import { useModel, useAccess, Access } from 'umi';
import type {
  ActionType,
  RequestOptionsType,
} from '@ant-design/pro-components';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { departmentQuery, pageUser, UserOpt } from '@/api/user';
import columns from '@/pages/User/Admin/columns';

const Index = () => {
  // const { initialState } = useModel("@@initialState");
  // const { currentUser } = initialState ?? {};

  const actionRef = useRef<ActionType>(); //Table action 的引用，便于自定义触发

  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
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
        type: 'multiple',
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
          await UserOpt(form, 'PUT');
        },
        onDelete: async (key) => {
          await UserOpt({ uid: key } as API.IUser, 'DELETE');
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
      headerTitle="Project List"
    />
  );
};

export default Index;
