import React, { useRef, FC, useState, useEffect, useCallback } from 'react';
import { Col, Divider, message, Modal, Popconfirm, Row, Tag } from 'antd';
import {
  ActionType,
  ProColumns,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import { API } from '@/api';
import {
  delApiCase,
  pageApiCase,
  queryApiCaseByCasePartID,
  runApi,
} from '@/api/interface';
import RunGroup from '@/pages/Case/CaseAPI/component/RunGroup';
import AddApiCase from '@/pages/Case/CaseAPI/component/AddApiCase';
import { CONFIG } from '@/utils/config';
import { history } from '@@/core/history';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Result from '@/pages/Case/CaseAPI/component/Result/Result';

interface SelfProps {
  projectID?: number;
  currentCasePartID: number;
}

const CaseApiLeft: FC<SelfProps> = ({ projectID, currentCasePartID }) => {
  const actionRef = useRef<ActionType>(); //Table action 的引用，便于自定义触发
  const [currentAPIs, setCurrentAPIs] = useState([]);
  const [responseUid, setResponseUid] = useState<string>();
  const [resultModal, setResultModal] = useState<boolean>(false);
  const [selectKeys, setSelectKeys] = useState<string[]>([]);

  useEffect(() => {
    if (projectID) setCurrentAPIs([]);
  }, [projectID]);

  const fetchApisData = useCallback(
    async (params: API.ISearch) => {
      if (!currentCasePartID) return undefined;
      const { code, data } = await pageApiCase({
        casePartID: currentCasePartID,
        ...params,
      });
      if (code === 0) {
        setCurrentAPIs(data.items);
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
  }, [currentCasePartID, fetchApisData]);

  // 删除用例
  const delCaseApi = async (uid: string) => {
    const res = await delApiCase({ uid: uid });
    if (res.code === 0) message.success(res.msg);
    actionRef.current?.reload();
  };

  const run = async (uid: string) => {
    setResultModal(true);
    const { code, data } = await runApi({ uid });
    if (code === 0) setResponseUid(data);
    else setResultModal(false);
  };

  // table columns
  const columns: ProColumns[] = [
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '请求协议',
      dataIndex: 'http',
      search: false,
      render: (text: any) => {
        return CONFIG.REQUEST_TYPE[text];
      },
    },
    {
      title: '优先级',
      dataIndex: 'level',
      valueType: 'select',
      valueEnum: CONFIG.API_LEVEL_ENUM,
      render: (text, record) => {
        return (
          <Tag color={CONFIG.RENDER_CASE_LEVEL[record.level].color}>
            {CONFIG.RENDER_CASE_LEVEL[record.level].text}
          </Tag>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: CONFIG.CASE_STATUS_ENUM,
      render: (text, record) => {
        return (
          <Tag color={CONFIG.RENDER_CASE_STATUS[record.status].color}>
            {CONFIG.RENDER_CASE_STATUS[record.status].text}
          </Tag>
        );
      },
    },
    {
      title: '创建人',
      dataIndex: 'creatorName',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'date',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _) => {
        return (
          <>
            <a
              target="_blank"
              rel="noopener noreferrer"
              key="view"
              onClick={() => {
                history.push(
                  `/interface/caseApi/detail/projectID=${projectID}&casePartID=${currentCasePartID}&uid=${record.uid}`,
                );
              }}
            >
              详情
            </a>
            <Divider type={'vertical'} />
            <a
              onClick={async () => {
                await run(record.uid);
              }}
            >
              执行
            </a>
            <Divider type={'vertical'} />
            <Popconfirm
              title={'确认删除？'}
              okText={'确认'}
              cancelText={'点错了'}
              onConfirm={async () => {
                await delCaseApi(record.uid);
              }}
            >
              <a style={{ marginLeft: 8 }}>删除</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Result
        uid={responseUid}
        modal={resultModal}
        setModal={setResultModal}
        single={false}
      />
      <ProTable
        rowKey={(record) => record.uid}
        columns={columns}
        actionRef={actionRef}
        // @ts-ignore
        request={fetchApisData}
        dataSource={currentAPIs}
        rowSelection={{
          onChange: (keys) => {
            setSelectKeys(keys as string[]);
          },
        }}
        pagination={{
          pageSize: 10,
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage', //持久化列的类类型， localStorage 设置在关闭浏览器后也是存在的，sessionStorage 关闭浏览器后会丢失 sessionStorage
        }}
        cardBordered
        search={{
          labelWidth: 'auto',
          span: 4,
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
          reload: true,
        }}
        bordered
        toolBarRender={() => [
          <RunGroup selectedKeys={selectKeys} />,
          <AddApiCase
            actionRef={actionRef}
            casePartID={currentCasePartID!}
            projectID={projectID!}
          />,
        ]}
      ></ProTable>
    </>
  );
};

export default React.memo(CaseApiLeft);
