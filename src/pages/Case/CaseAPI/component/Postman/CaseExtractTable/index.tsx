import React, { FC, useEffect, useState } from 'react';
import EditableTable from '@/components/Table/EditableTable';
import ExtractColumns from '@/pages/Case/CaseAPI/component/Postman/CaseExtractTable/columns';

interface SelfProps {
  SE: any;
  detail?: any;
}

const Index: FC<SelfProps> = (props) => {
  const { detail } = props;
  const [extractData, setExtractData] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    extractData.map((item: any) => item.id),
  );
  useEffect(() => {
    if (detail) {
      setExtractData(detail.extracts);
    }
  }, []);

  useEffect(() => {
    props.SE(extractData);
  }, [extractData]);

  return (
    <EditableTable
      columns={ExtractColumns}
      title="Extract"
      dataSource={extractData}
      setDataSource={setExtractData}
      editableKeys={editableKeys}
      setEditableRowKeys={setEditableRowKeys}
    />
  );
};

export default Index;