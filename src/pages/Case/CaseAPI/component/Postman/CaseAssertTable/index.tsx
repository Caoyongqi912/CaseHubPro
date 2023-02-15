import React, { FC, useEffect, useState } from 'react';
import { assertColumns } from '@/pages/Case/CaseAPI/component/Postman/CaseAssertTable/columns';
import EditableTable from '@/components/Table/EditableTable';

interface SelfProps {
  SA: any;
  detail?: any;
}

const Index: FC<SelfProps> = (props) => {
  const { detail } = props;
  const [assertData, setAssertData] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    assertData.map((item: any) => item.id),
  );
  useEffect(() => {
    if (detail) {
      setAssertData(detail.asserts);
    }
  }, []);

  useEffect(() => {
    props.SA(assertData);
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
