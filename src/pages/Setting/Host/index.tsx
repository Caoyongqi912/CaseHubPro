import React, { useRef } from 'react';
import { ActionType, ProTable } from '@ant-design/pro-components';
import columns from '@/pages/Setting/Host/columns';
import { hostOpt, pageHost } from '@/api/host';
import AddHost from '@/pages/Setting/Host/components/AddHost';

const Index = () => {
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
      request={async (param: API.ISearch) => {
        const res: any = await pageHost(param);
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
        onSave: async (key, record: API.IHost) => {
          const form = {
            uid: record.uid,
            name: record.name,
            host: record.host,
            creator: record.creator,
            updater: record.updater,
          };
          return await hostOpt('PUT', form);
        },
        onDelete: async (key) => {
          return await hostOpt('DELETE', { uid: key } as API.IHost);
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
      }}
      dateFormatter="string"
      headerTitle="Host List"
      toolBarRender={() => [<AddHost reload={isReload} />]}
    ></ProTable>
  );
};

export default Index;
