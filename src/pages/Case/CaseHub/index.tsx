import React from 'react';
import SplitPane from 'react-split-pane';
import { PageContainer } from '@ant-design/pro-layout';
import './index.less';

const Index = () => {
  return (
    <PageContainer title={false}>
      <SplitPane
        split="vertical"
        minSize={100}
        maxSize={-100}
        defaultSize={'50%'}
      >
        <div>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
          <h1>1</h1>
        </div>
        <h2>2</h2>
      </SplitPane>
    </PageContainer>
  );
};

export default Index;
