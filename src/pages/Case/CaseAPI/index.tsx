import React, { FC, useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card } from 'antd';
import CaseRightComponent from '@/components/CaseRightComponent';
import CaseApiLeft from '@/pages/Case/CaseAPI/component/CaseApiLeft';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

const Index: FC = () => {
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
        style={{ height: '100%', minHeight: 800 }}
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

          <CaseApiLeft
            currentCasePartID={currentCasePartID!}
            projectID={selectedProject}
          />
        </SplitterLayout>
      </Card>
    </PageContainer>
  );
};

export default Index;
