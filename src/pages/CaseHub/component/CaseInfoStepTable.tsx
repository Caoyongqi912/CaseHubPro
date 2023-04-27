import React, { FC } from 'react';
import EditableTable from '@/components/Table/EditableTable';
import { ProColumns } from '@ant-design/pro-components';

type DataSourceType = {
  id: React.Key;
  step: number;
  todo: string;
  exp: string;
};

interface selfProps {
  caseInfo: DataSourceType[];
  setCaseInfo: any;
  editableKeys: any;
  setEditableRowKeys: any;
}

const CaseInfoStepTable: FC<selfProps> = ({
  caseInfo,
  setCaseInfo,
  editableKeys,
  setEditableRowKeys,
}) => {
  const caseInfoColumn: ProColumns<DataSourceType>[] = [
    {
      title: '步骤',
      dataIndex: 'step',
      width: '8%',
      // valueType: 'text',
      valueType: 'index',
    },
    {
      title: '操作步骤',
      dataIndex: 'todo',
      valueType: 'textarea',
      ellipsis: true,
    },
    {
      title: '预期结果',
      dataIndex: 'exp',
      valueType: 'textarea',
      ellipsis: true,
    },
    {
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      width: 70,
      render: (_, record: DataSourceType) => [
        <a
          key="delete"
          type="primary"
          onClick={() => {
            const data = caseInfo.filter((item: any) => item.id !== record.id);
            setCaseInfo(data);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <EditableTable
      title={'执行步骤'}
      columns={caseInfoColumn}
      dataSource={caseInfo}
      setDataSource={setCaseInfo}
      editableKeys={editableKeys}
      setEditableRowKeys={setEditableRowKeys}
    />
  );
};

export default CaseInfoStepTable;
