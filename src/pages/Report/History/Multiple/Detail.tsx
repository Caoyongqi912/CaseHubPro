import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Descriptions, message, Row, Spin, Tag } from 'antd';
import {
  ProCard,
  ProColumns,
  ProTable,
  StatisticCard,
} from '@ant-design/pro-components';
import { Pie } from '@ant-design/charts';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  FrownTwoTone,
  LikeTwoTone,
  SmileTwoTone,
} from '@ant-design/icons';
import { getInterfacesResultInfo } from '@/api/interface';
import { useParams } from 'umi';
import './Detail.less';
import { CONFIG } from '@/utils/config';
import { ResponseAPI } from '@/api';
import Result from '@/pages/Case/CaseAPI/component/Result/Result';

interface SelfProps {
  uid: string;
}

interface IDetail {
  id: number;
  uid: string;
  create_time: string;
  update_time: string;
  end_time: string;
  starterID: number;
  starterName: string;
  status: 'RUNNING' | 'DONE';
  successNumber: number;
  failNumber: number;
  totalNumber: number;
  rateNumber: number;
  totalUseTime: string;
  detail: ResponseAPI.IApiResponse[];
}

const DescriptionsItem = Descriptions.Item;
const Detail = () => {
  const { uid } = useParams<SelfProps>();
  const [info, setInfo] = useState<IDetail>();
  const [loading, setLoading] = useState<boolean>(true);
  const [caseDataSource, setCaseDataSource] = useState<
    ResponseAPI.IApiResponse[]
  >([]);
  const [resultModal, setResultModal] = useState<boolean>(false);
  const [infoDetail, setInfoDetail] = useState<ResponseAPI.IApiResponse>();
  const fetchData = async (uid: string) => {
    const { code, data, msg } = await getInterfacesResultInfo({ uid: uid });
    if (code === 0) {
      setInfo(data);
      setCaseDataSource(data.detail);
      setLoading(false);
    } else {
      message.error(msg);
    }
  };

  useEffect(() => {
    if (uid) {
      fetchData(uid).then();
    }
  }, [uid]);

  const PieData = [
    {
      type: '成功',
      value: info?.successNumber,
    },
    {
      type: '失败',
      value: info?.failNumber,
    },
  ];
  const PieConfig = {
    height: 230,
    appendPadding: 10,
    data: PieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  const columns: ProColumns[] = [
    {
      title: 'UID',
      dataIndex: 'uid',
      key: 'uid',
      ellipsis: true,
    },
    {
      title: '名称',
      dataIndex: 'interfaceName',
      key: 'interfaceName',
      render: (text) => <Tag color={'blue'}>{text}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      search: false,
      valueEnum: CONFIG.CASE_STATUS_ENUM,
      render: (text, record) => {
        return (
          <Tag color={record.status === 'SUCCESS' ? 'green' : 'red'}>
            {text}
          </Tag>
        );
      },
    },
    {
      title: '创建人',
      dataIndex: 'starterName',
      render: (text) => <Tag color={'blue'}>{text}</Tag>,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          onClick={() => {
            setInfoDetail(record);
            setResultModal(true);
          }}
        >
          详情
        </a>,
      ],
    },
  ];

  return (
    <PageContainer title={false}>
      <Result
        modal={resultModal}
        setModal={setResultModal}
        single={false}
        result={infoDetail}
      />

      <Spin tip={'努力加载中。。'} size={'large'} spinning={loading}>
        {info && (
          <ProCard title={'测试报告'}>
            <Row gutter={[8, 8]}>
              <Col span={17}>
                <Row gutter={8}>
                  <Col span={6}>
                    <Card
                      hoverable
                      bordered={false}
                      className={'statisticCard'}
                    >
                      <StatisticCard
                        statistic={{
                          title: '用例总数',
                          value: info.totalNumber,
                          prefix: <SmileTwoTone />,
                        }}
                      />
                    </Card>
                  </Col>
                  <Col span={6}>
                    <ProCard
                      hoverable
                      bordered={false}
                      className={'statisticCard'}
                    >
                      <StatisticCard
                        statistic={{
                          title: '成功数量',
                          value: info.successNumber,
                          prefix: (
                            <CheckCircleTwoTone twoToneColor="rgb(63, 205, 127)" />
                          ),
                        }}
                      />
                    </ProCard>
                  </Col>
                  <Col span={6}>
                    <ProCard
                      hoverable
                      bordered={false}
                      className={'statisticCard'}
                    >
                      <StatisticCard
                        statistic={{
                          title: '失败数量',
                          value: info.failNumber,
                          prefix: (
                            <CloseCircleTwoTone twoToneColor="rgb(230, 98, 97)" />
                          ),
                        }}
                      />
                    </ProCard>
                  </Col>
                  <Col span={6}>
                    <ProCard
                      hoverable
                      bordered={false}
                      className={'statisticCard'}
                    >
                      <StatisticCard
                        statistic={{
                          title: '测试通过率',
                          value: info.rateNumber,
                          prefix:
                            info.rateNumber > 90 ? (
                              <LikeTwoTone />
                            ) : (
                              <FrownTwoTone />
                            ),
                          suffix: '%',
                        }}
                      />
                    </ProCard>
                  </Col>
                </Row>
                <Descriptions>
                  <DescriptionsItem label="测试结果">
                    {info.status === 'RUNNING' ? (
                      <Tag color={'blue'}>{info.status}</Tag>
                    ) : (
                      <Tag color={'green'}>{info.status}</Tag>
                    )}
                  </DescriptionsItem>
                  <DescriptionsItem label="执行人">
                    <Tag color={'orange'}>{info.starterName}</Tag>
                  </DescriptionsItem>
                  <DescriptionsItem label="开始时间">
                    <Tag color={'processing'}>{info.create_time}</Tag>
                  </DescriptionsItem>
                  <DescriptionsItem label="结束时间">
                    <Tag color={'processing'}>{info.create_time}</Tag>
                  </DescriptionsItem>
                  <DescriptionsItem label="耗时">
                    <Tag color={'processing'}>{info.totalUseTime}</Tag>
                  </DescriptionsItem>
                </Descriptions>
              </Col>
              <Col span={7}>
                <Pie {...PieConfig} />
              </Col>
            </Row>
          </ProCard>
        )}
        <ProCard title={'用例列表'} className={'bottomCard'}>
          <ProTable
            dataSource={caseDataSource}
            columns={columns}
            search={false}
            cardBordered
            rowKey="uid"
            dateFormatter="string"
          />
        </ProCard>
      </Spin>
    </PageContainer>
  );
};

export default Detail;
