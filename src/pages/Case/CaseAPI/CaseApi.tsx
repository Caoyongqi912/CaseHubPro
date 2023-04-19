import React, { FC, useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Col, Row } from 'antd';
import CaseRightComponent from '@/components/CaseRightComponent';
import CaseApiLeft from '@/pages/Case/CaseAPI/component/CaseApiLeft';

const CaseApi: FC = () => {
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
        <Row gutter={2}>
          <Col span={6}>
            <CaseRightComponent
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              setCurrentCasePartID={setCurrentCasePartID}
            />
          </Col>
          <Col span={18}>
            <CaseApiLeft
              currentCasePartID={currentCasePartID}
              projectID={selectedProject}
            />
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default CaseApi;
