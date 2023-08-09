import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
  ActionType,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import { ProColumns } from '@ant-design/pro-table/lib/typing';
import { API } from '@/api';
import { ProCard } from '@ant-design/pro-components';
import { delCase, pageCases } from '@/api/case';
import { message, Tag, Popconfirm } from 'antd';
import { CONFIG } from '@/utils/config';
import AddCase from '@/pages/CaseHub/component/AddCase';
import ShowCase from '@/pages/CaseHub/component/ShowCase';

interface SelfProps {
  projectID: number;
  currentCasePartID: number;
}

const CaseHubTable: FC<SelfProps> = ({ projectID, currentCasePartID }) => {
  const ref = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>(); //Table action 的引用，便于自定义触发
  const [caseInfo, setCaseInfo] = useState<API.ICaseInfo>();
  const [showCaseDrawerVisibleProps, setShowCaseDrawerVisibleProps] =
    useState<boolean>(false);
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
      valueEnum: CONFIG.CASE_LEVEL_ENUM,
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
            <a
              onClick={() => {
                setCaseInfo(record);
                setShowCaseDrawerVisibleProps(true);
              }}
            >
              详情
            </a>
            <Popconfirm
              title="确定要删除吗？"
              onConfirm={async () => {
                await fetchDeleteDate(record.uid);
              }}
              okText="是"
              cancelText="否"
            >
              <a style={{ marginLeft: 8 }}>删除</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  const [currentCases, setCurrentCases] = useState<API.ICaseInfo[]>([]);

  useEffect(() => {
    if (projectID) setCurrentCases([]);
  }, [projectID]);

  const fetchDeleteDate = async (uid: string) => {
    const { code, msg } = await delCase({ uid: uid });
    if (code === 0) {
      message.success(msg);
      actionRef.current?.reload();
      return;
    }
  };

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
    <ProCard>
      <ShowCase
        caseInfo={caseInfo!}
        drawerVisibleProps={showCaseDrawerVisibleProps}
        setDrawerVisible={setShowCaseDrawerVisibleProps}
        casePartID={currentCasePartID}
        projectID={projectID!}
      />
      <ProTable
        formRef={ref}
        actionRef={actionRef}
        dataSource={currentCases}
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
          labelWidth: 80,
          // span: 6,
          showHiddenNum: true,
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
