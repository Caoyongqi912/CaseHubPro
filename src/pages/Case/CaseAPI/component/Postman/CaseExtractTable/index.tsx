import React, { FC, useEffect, useState } from 'react';
import EditableTable from '@/components/Table/EditableTable';
import ExtractColumns from '@/pages/Case/CaseAPI/component/Postman/CaseExtractTable/columns';

interface SelfProps {
  SE: any;
  apiStepDetail?: any;
  step: number;
}

const Index: FC<SelfProps> = (props) => {
  const { apiStepDetail, step } = props;
  const [extractData, setExtractData] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    extractData.map((item: any) => item.id),
  );
  useEffect(() => {
    if (apiStepDetail) {
      setExtractData(apiStepDetail.extracts);
    }
  }, [apiStepDetail]);

  useEffect(() => {
    if (extractData && extractData.length > 0) {
      props.SE(step, extractData);
    }
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
