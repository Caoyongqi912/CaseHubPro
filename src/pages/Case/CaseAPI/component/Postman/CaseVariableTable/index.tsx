import React, { useState } from 'react';
import EditableTable from '@/components/Table/EditableTable';
import { assertColumns } from '@/pages/Case/CaseAPI/component/Postman/CaseAssertTable/columns';

const Index = () => {
  const [variableData, setVariableData] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    variableData.map((item: any) => item.id),
  );

  return (
    <EditableTable
      columns={[]}
      title="Variable"
      dataSource={variableData}
      setDataSource={setVariableData}
      editableKeys={editableKeys}
      setEditableRowKeys={setEditableRowKeys}
    />
  );
};

export default Index;
