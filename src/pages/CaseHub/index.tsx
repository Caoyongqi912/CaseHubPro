import React, { useEffect, useRef, useState } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import { Card } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import CaseRightComponent from '@/components/CaseRightComponent';
import CaseHubTable from '@/pages/CaseHub/component/CaseHubTable';
import { ProCard } from '@ant-design/pro-components';

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
      <ProCard
        style={{ height: '100%', minHeight: '900px' }}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <SplitterLayout
          ref={splitPaneRef}
          percentage={true}
          secondaryInitialSize={80}
          primaryMinSize={15}
          secondaryMinSize={70}
        >
          <CaseRightComponent
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            setCurrentCasePartID={setCurrentCasePartID}
          />
          <CaseHubTable
            projectID={selectedProject!}
            currentCasePartID={currentCasePartID!}
          />
        </SplitterLayout>
      </ProCard>
    </PageContainer>
  );
};

export default Index;
