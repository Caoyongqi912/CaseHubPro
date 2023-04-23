import React, { useEffect, useRef, useState } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import CaseRightComponent from '@/components/CaseRightComponent';
import CaseHubTable from '@/pages/CaseHub/component/CaseHubTable';

const Index = () => {
  const splitPaneRef = useRef<SplitterLayout>(null);
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
        <SplitterLayout
          ref={splitPaneRef}
          percentage={true}
          secondaryInitialSize={70}
          primaryMinSize={20}
          secondaryMinSize={60}
        >
          <CaseRightComponent
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            setCurrentCasePartID={setCurrentCasePartID}
          />
          <CaseHubTable
            projectID={selectedProject}
            currentCasePartID={currentCasePartID!}
          />
        </SplitterLayout>
      </Card>
    </PageContainer>
  );
};

export default Index;
