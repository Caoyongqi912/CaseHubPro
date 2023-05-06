import React, { FC, useEffect, useRef, useState } from 'react';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { message, Tabs } from 'antd';
import Single from '@/pages/Report/History/Single';
import Multiple from '@/pages/Report/History/Multiple';
import { PageContainer } from '@ant-design/pro-layout';

const TabPane = Tabs.TabPane;
const Index: FC = () => {
  const actionRef = useRef<ActionType>(); //Table action 的引用，便于自定义触发

  return (
    <PageContainer title={false}>
      <Tabs
        style={{ width: '100%', height: '100%' }}
        tabPosition={'top'}
        size={'large'}
        defaultValue={'2'}
      >
        <TabPane tab={<span>单个构建历史</span>} key={'1'}>
          <Single />
        </TabPane>
        <TabPane tab={<span>批量构建历史</span>} key={'2'}>
          <Multiple />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default Index;
