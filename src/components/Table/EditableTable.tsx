import React, { FC, useEffect } from 'react';
import { EditableProTable } from '@ant-design/pro-components';

interface SelfProps {
  form?: any;
  columns: any;
  dataSource: any;
  title: string;
  setDataSource: any;
  editableKeys: any;
  setEditableRowKeys: any;
  extra?: any;
}

const EditableTable: FC<SelfProps> = ({
  form,
  columns,
  dataSource,
  title,
  setDataSource,
  editableKeys,
  setEditableRowKeys,
  extra,
}) => {
  useEffect(() => {
    setEditableRowKeys(dataSource.map((v: any) => v.id));
  }, [dataSource]);

  return (
    <EditableProTable
      form={form}
      headerTitle={title}
      columns={columns}
      rowKey="id"
      value={dataSource}
      onChange={setDataSource}
      recordCreatorProps={{
        newRecordType: 'dataSource',
        record: () => ({
          id: Date.now(),
        }),
      }}
      editable={{
        type: 'multiple',
        editableKeys,
        actionRender: (row, config, defaultDoms) => {
          return [defaultDoms.delete];
        },
        onValuesChange: (record, recordList) => {
          if (extra) {
            extra(recordList);
          }
          setDataSource(recordList);
        },
        onChange: setEditableRowKeys,
      }}
    />
  );
};
export default EditableTable;
