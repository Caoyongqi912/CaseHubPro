import React, { FC, useEffect } from 'react';
import { EditableProTable } from '@ant-design/pro-components';

interface SelfProps {
  columns: any;
  dataSource: any;
  title?: string;
  setDataSource: any;
  editableKeys: any;
  setEditableRowKeys: any;
  extra?: any;
  recordCreatorProps?: boolean;
}

const EditableTable: FC<SelfProps> = ({
  columns,
  dataSource,
  title,
  setDataSource,
  editableKeys,
  setEditableRowKeys,
  extra,
  recordCreatorProps = true,
}) => {
  useEffect(() => {
    if (dataSource) {
      setEditableRowKeys(dataSource.map((v: any) => v.id));
    }
  }, [dataSource]);

  return (
    <EditableProTable
      headerTitle={title}
      columns={columns}
      rowKey="id"
      value={dataSource}
      onChange={setDataSource}
      recordCreatorProps={
        recordCreatorProps === true
          ? {
              newRecordType: 'dataSource',
              record: () => ({
                id: Date.now(),
              }),
            }
          : false
      }
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
