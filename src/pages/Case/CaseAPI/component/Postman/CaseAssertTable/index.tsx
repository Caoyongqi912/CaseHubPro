import React, { FC, useEffect, useState } from 'react';
import { assertColumns } from '@/pages/Case/CaseAPI/component/Postman/CaseAssertTable/columns';
import EditableTable from '@/components/Table/EditableTable';
import { SetAsserts } from '@/pages/Case/CaseAPI/MyHook/func';

interface SelfProps {
  SetAsserts: SetAsserts;
  apiStepDetail?: any;
  step: number;
}

const Index: FC<SelfProps> = (props) => {
  const { apiStepDetail, step, SetAsserts } = props;
  const [assertData, setAssertData] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    assertData.map((item: any) => item.id),
  );
  useEffect(() => {
    if (apiStepDetail) {
      setAssertData(apiStepDetail.asserts);
    }
  }, [apiStepDetail]);

  useEffect(() => {
    if (assertData && assertData.length > 0) {
      SetAsserts(step, assertData);
    }
  }, [assertData]);

  return (
    <EditableTable
      columns={assertColumns}
      title="Assert"
      dataSource={assertData}
      setDataSource={setAssertData}
      editableKeys={editableKeys}
      setEditableRowKeys={setEditableRowKeys}
    />
  );
};

Index.propTypes = {};

export default Index;
