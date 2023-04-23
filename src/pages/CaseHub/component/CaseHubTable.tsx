import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  ActionType,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import { ProColumns } from '@ant-design/pro-table/lib/typing';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { API } from '@/api';
import { ProCard } from '@ant-design/pro-components';
import { queryApiCaseByCasePartID } from '@/api/interface';
import { pageCases } from '@/api/case';

interface SelfProps {
  projectID?: number;
  currentCasePartID: number;
}

const CaseHubTable: FC<SelfProps> = ({ projectID, currentCasePartID }) => {
  const ref = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>(); //Table action 的引用，便于自定义触发
  const caseColumns: ProColumns[] = [
    {
      title: '用例标题',
      key: 'case_title',
      dataIndex: 'case_title',
    },
    {
      title: '用例描述',
      key: 'case_desc',
      dataIndex: 'case_desc',
    },
    {
      title: '用例等级',
      key: 'case_level',
      dataIndex: 'case_level',
    },
    {
      title: '用例类型',
      key: 'case_type',
      dataIndex: 'case_type',
    },
    {
      title: '用例创建人',
      key: 'creatorName',
      dataIndex: 'creatorName',
    },
    {
      title: 'opt',
      valueType: 'option',
      render: (_: any, record: any) => {
        return (
          <>
            <EditTwoTone
              style={{ cursor: 'pointer' }}
              onClick={() => {
                // setEditableRowKeys([record.id]);
              }}
            />
            <DeleteTwoTone
              style={{ cursor: 'pointer', marginLeft: 8 }}
              twoToneColor="#eb2f96"
            />
          </>
        );
      },
    },
  ];
  const [currentCases, setCurrentCases] = useState([]);

  useEffect(() => {
    if (projectID) setCurrentCases([]);
  }, [projectID]);

  const fetchCaseData = useCallback(
    async (params: API.ISearch) => {
      if (!currentCasePartID) return {};
      pageCases({ casePartID: currentCasePartID, ...params }).then(
        ({ code, data }) => {
          if (code === 0) {
            return {
              data: data.items,
              total: data.pageInfo.total,
              success: true,
              pageSize: data.pageInfo.page,
              current: data.pageInfo.limit,
            };
          }
          return {};
        },
      );
    },
    [currentCasePartID],
  );

  useEffect(() => {
    actionRef.current?.reload();
  }, [currentCasePartID, fetchCaseData]); // 将 requestFn 作为 useEffect 的依赖项之一

  return (
    <ProCard bordered={false} hoverable>
      <ProTable
        formRef={ref}
        actionRef={actionRef}
        dataSource={currentCases}
        // @ts-ignore
        request={fetchCaseData}
        rowKey={(record) => record.uid}
        columns={caseColumns}
        cardBordered
        options={{
          setting: {
            listsHeight: 400,
          },
          reload: true,
        }}
        pagination={{
          pageSize: 10,
        }}
      />
    </ProCard>
  );
};

export default CaseHubTable;
