import React, { FC } from 'react';
import { Badge, Card, Descriptions } from 'antd';
import { ResponseAPI } from '@/api';

const DescriptionsItem = Descriptions.Item;

interface SelfProps {
  response: ResponseAPI.IApiResponse;
}

const Index: FC<SelfProps> = (props) => {
  const { response } = props;
  return (
    <Card>
      <Descriptions
        column={1}
        bordered
        title={'Response.Info'}
        size={'default'}
      >
        <DescriptionsItem label="用例名称">
          {response?.interfaceName}
        </DescriptionsItem>
        <DescriptionsItem label="测试结果">
          <Badge
            status={response?.status === 'SUCCESS' ? 'success' : 'error'}
            text={response?.status}
          />
        </DescriptionsItem>
        <DescriptionsItem label="用例描述">
          {response?.interfaceName}
        </DescriptionsItem>

        <DescriptionsItem label="测试人">
          {response?.starterName}
        </DescriptionsItem>
        <DescriptionsItem label="测试时间">
          {response?.create_time}
        </DescriptionsItem>
        <DescriptionsItem label="运行时间">
          {response?.useTime}
        </DescriptionsItem>
      </Descriptions>
    </Card>
  );
};

export default Index;
