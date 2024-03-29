import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import NewProject from '@/components/NewProject';
import { pageProject, projectOpt } from '@/api/project';
import columns from '@/pages/Project/columns';
import { message } from 'antd';
import { API } from '@/api';

const ProjectList: React.FC = () => {
  const actionRef = useRef<ActionType>(); //Table action 的引用，便于自定义触发
  const isReload = (value: boolean) => {
    if (value) {
      actionRef.current?.reload();
    }
  };

  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params: API.ISearch) => {
        const res: any = await pageProject(params);
        return {
          data: res.data.items,
          total: res.data.pageInfo.total,
          success: res.msg,
          pageSize: res.data.pageInfo.page,
          current: res.data.pageInfo.limit,
        };
      }}
      editable={{
        //可编辑表格的相关配置
        type: 'single', // 编辑单行
        onSave: async (key, record: API.IProject) => {
          const form = {
            uid: record.uid,
            name: record.name,
            desc: record.desc,
          };
          return await projectOpt(form as API.INewOrUpdateProject, 'PUT');
        },
        onDelete: async (key, record: API.IProject) => {
          const form = {
            uid: record.uid,
          };
          const res = await projectOpt(
            form as API.INewOrUpdateProject,
            'DELETE',
          );
          message.success(res.msg);
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
      toolBarRender={() => [<NewProject reload={isReload} />]}
    />
  );
};

export default ProjectList;
