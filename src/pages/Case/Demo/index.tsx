import React, { useRef } from 'react';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';

const Index: React.FC = () => {
  const splitPaneRef = useRef<SplitterLayout>(null);

  return (
    <div style={{ height: '100vh', display: 'flex' }}>
      <SplitterLayout
        ref={splitPaneRef}
        percentage={true}
        secondaryInitialSize={80}
        primaryMinSize={10}
        secondaryMinSize={60}
      >
        <div>left</div>
        <div>right</div>
      </SplitterLayout>
    </div>
  );
};

export default Index;
