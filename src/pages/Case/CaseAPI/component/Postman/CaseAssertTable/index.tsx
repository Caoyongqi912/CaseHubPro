import React, { FC, useState } from 'react';
import { assertColumns } from '@/pages/Case/CaseAPI/component/Postman/CaseAssertTable/columns';
import EditableTable from '@/components/Table/EditableTable';

interface SelfProps {}

const Index: FC<SelfProps> = (props) => {
  const [assertData, setAssertData] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    assertData.map((item: any) => item.id),
  );

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
