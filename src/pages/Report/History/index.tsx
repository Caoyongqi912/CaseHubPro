import React, { FC, useEffect, useRef, useState } from 'react';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { pageInterfaceGroupResult } from '@/api/interface';
import columns from '@/pages/Report/History/columns';
import { pageHost } from '@/api/host';
import { API } from '@/api';
import { message } from 'antd';

const Index: FC = () => {
  const [groupData, setGroupData] = useState([]);
  const actionRef = useRef<ActionType>(); //Table action 的引用，便于自定义触发

  // useEffect(() => {
  //   pageInterfaceGroupResult().then(({ data }) => {
  //     console.log("===", data);
  //     setGroupData(data.items);
  //   });
  // }, []);
  return (
    <ProTable
      columns={columns}
      // dataSource={groupData}
      actionRef={actionRef}
      cardBordered
      rowKey="uid"
      request={async (params, sort, filter) => {
        console.log('===', params);
        const res = await pageInterfaceGroupResult(params as API.ISearch);
        if (res.code === 0) {
          return {
            data: res.data.items,
            total: res.data.pageInfo.total,
            success: true,
            pageSize: res.data.pageInfo.page,
            current: res.data.pageInfo.limit,
          };
        } else {
          message.error(res.msg);
          return {
            success: false,
          };
        }
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
      headerTitle="构建列"
    />
  );
};

export default Index;
