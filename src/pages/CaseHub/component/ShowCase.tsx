import React, { FC, useEffect, useState } from 'react';
import { Drawer } from 'antd';
import CaseForm from '@/pages/CaseHub/component/CaseForm';
import { API } from '@/api';

interface SelfProps {
  caseInfo: API.ICaseInfo;
  drawerVisibleProps: boolean;
  setDrawerVisible: any;
  casePartID: number;
  projectID: number;
}

const ShowCase: FC<SelfProps> = (props) => {
  const {
    caseInfo,
    drawerVisibleProps = false,
    setDrawerVisible,
    casePartID,
    projectID,
  } = props;

  return (
    <Drawer
      bodyStyle={{ padding: 0 }}
      visible={drawerVisibleProps}
      width={'65%'}
      title="用例详情"
      onClose={() => setDrawerVisible(false)}
      maskClosable={false}
    >
      <CaseForm
        caseInfo={caseInfo}
        casePartID={casePartID}
        projectID={projectID}
        update={true}
        setDrawerVisible={setDrawerVisible}
      />
    </Drawer>
  );
};

export default ShowCase;
