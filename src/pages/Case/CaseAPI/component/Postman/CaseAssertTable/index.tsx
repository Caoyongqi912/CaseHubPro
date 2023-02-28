import React, { FC, useEffect, useState } from 'react';
import { assertColumns } from '@/pages/Case/CaseAPI/component/Postman/CaseAssertTable/columns';
import EditableTable from '@/components/Table/EditableTable';

interface SelfProps {
  SA: any;
  apiStepDetail?: any;
  step: number;
}

const Index: FC<SelfProps> = (props) => {
  const { apiStepDetail, step } = props;
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
    if (assertData) {
      props.SA(step, assertData);
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
