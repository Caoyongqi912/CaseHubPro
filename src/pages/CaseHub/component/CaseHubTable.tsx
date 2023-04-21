import React, { FC } from 'react';
import { ProTable } from '@ant-design/pro-components';

interface SelfProps {
  projectID?: number;
  currentCasePartID?: number;
}

const CaseHubTable: FC<SelfProps> = ({ projectID, currentCasePartID }) => {
  return <ProTable></ProTable>;
};

export default CaseHubTable;
