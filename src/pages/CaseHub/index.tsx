import React, { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane-v2';
import './index.less';
import { Card, Col, Row } from 'antd';
import { API } from '@/api';
import { queryProject } from '@/api/project';
import { PageContainer } from '@ant-design/pro-layout';
import CaseRightComponent from '@/components/CaseRightComponent';

const Index = () => {
  const [currentCasePartID, setCurrentCasePartID] = useState<
    number | undefined
  >();
  const [selectedProject, setSelectedProject] = useState<number | undefined>(
    undefined,
  );

  return (
    <PageContainer title={false}>
      <Card
        style={{ height: '100%', minHeight: 600 }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        {/*// @ts-ignore*/}
        <SplitPane
          split="vertical"
          minSize={260}
          defaultSize={300}
          maxSize={800}
        >
          <CaseRightComponent
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            setCurrentCasePartID={setCurrentCasePartID}
          />
          <Card>
            <div style={{ backgroundColor: 'green' }}>右侧面板</div>
          </Card>
        </SplitPane>
      </Card>
    </PageContainer>
  );
};

export default Index;
