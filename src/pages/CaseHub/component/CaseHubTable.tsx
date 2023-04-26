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
import { Tag } from 'antd';
import { CONFIG } from '@/utils/config';
import AddCase from '@/pages/CaseHub/component/AddCase';

interface SelfProps {
  projectID: number;
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
      search: false,
      dataIndex: 'case_desc',
    },
    {
      title: '用例等级',
      key: 'case_level',
      dataIndex: 'case_level',
      render: (text, record) => {
        return (
          <Tag color={CONFIG.RENDER_CASE_LEVEL[record.case_level].color}>
            {CONFIG.RENDER_CASE_LEVEL[record.case_level].text}
          </Tag>
        );
      },
    },
    {
      title: '用例类型',
      key: 'case_type',
      dataIndex: 'case_type',
      render: (text, record) => {
        return (
          <Tag color={CONFIG.RENDER_CASE_TYPE[record.case_type].color}>
            {CONFIG.RENDER_CASE_TYPE[record.case_type].text}
          </Tag>
        );
      },
    },
    {
      title: '创建人',
      key: 'creatorName',
      dataIndex: 'creatorName',
    },
    {
      title: '操作',
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
      const { code, data } = await pageCases({
        casePartID: currentCasePartID,
        ...params,
      });
      if (code === 0) {
        setCurrentCases(data.items);
        return {
          data: data.items,
          total: data.pageInfo.total,
          success: true,
        };
      }
      return {
        data: [],
        success: false,
        total: 0,
      };
    },
    [currentCasePartID],
  );

  useEffect(() => {
    actionRef.current?.reload();
  }, [currentCasePartID, fetchCaseData]);

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
        search={{
          collapsed: true,
          labelWidth: 'auto',
          span: 6,
        }}
        toolBarRender={() => [
          <AddCase
            casePartID={currentCasePartID}
            projectID={projectID!}
            actionRef={actionRef}
          />,
        ]}
      />
    </ProCard>
  );
};

export default CaseHubTable;
