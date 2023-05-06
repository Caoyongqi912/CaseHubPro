import React, { FC, useRef } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';

interface SelfProps {
  request: any;
  title: string;
  columns: ProColumns[];
}

const HistoryTable: FC<SelfProps> = (props) => {
  const { request, title, columns } = props;
  const actionRef = useRef<ActionType>(); //Table action 的引用，便于自定义触发

  return (
    <ProTable
      columns={columns}
      actionRef={actionRef}
      cardBordered
      rowKey="uid"
      request={request}
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
      headerTitle={title}
    />
  );
};

export default HistoryTable;
