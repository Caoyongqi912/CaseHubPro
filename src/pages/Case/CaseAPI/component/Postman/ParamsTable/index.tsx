import React, { FC } from 'react';
import EditableTable from '@/components/Table/EditableTable';
import { ProColumns } from '@ant-design/pro-table/lib/typing';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';

interface SelfProps {
  paramsData: any;
  setParamsData: any;
  editableKeys: any;
  setEditableRowKeys: any;
  form: any;
}

const Index: FC<SelfProps> = (props) => {
  const { paramsData, setParamsData, editableKeys, setEditableRowKeys, form } =
    props;

  const ParamColumns: ProColumns[] = [
    {
      title: 'key',
      key: 'key',
      dataIndex: 'key',
    },
    {
      title: 'value',
      key: 'value',
      dataIndex: 'value',
    },
    {
      title: 'desc',
      key: 'desc',
      dataIndex: 'desc',
    },
    {
      title: 'opt',
      valueType: 'option',
      render: (_: any, record: any) => {
        return (
          <>
            <EditTwoTone
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setEditableRowKeys([record.id]);
              }}
            />
            <DeleteTwoTone
              style={{ cursor: 'pointer', marginLeft: 8 }}
              onClick={() => {
                const data = paramsData.filter(
                  (item: any) => item.id !== record.id,
                );
                setParamsData(data);
                joinUrl(data);
              }}
              twoToneColor="#eb2f96"
            />
          </>
        );
      },
    },
  ];

  interface KV {
    id: number;
    key: any;
    value: any;
    desc: string;
  }

  // 根据paramsData拼接url
  const joinUrl = (data: KV[]) => {
    const url = form.getFieldValue('url');
    let tempUrl: string;
    if (url === undefined) {
      tempUrl = '';
    } else {
      tempUrl = url.split('?')[0];
    }
    data.forEach((item, idx) => {
      if (item.key) {
        // 如果item.key有效
        if (idx === 0) {
          tempUrl = `${tempUrl}?${item.key}=${item.value || ''}`;
        } else {
          tempUrl = `${tempUrl}&${item.key}=${item.value || ''}`;
        }
      }
    });
    form.setFieldsValue({ url: tempUrl });
  };

  return (
    <EditableTable
      columns={ParamColumns}
      dataSource={paramsData}
      setDataSource={setParamsData}
      extra={joinUrl}
      editableKeys={editableKeys}
      setEditableRowKeys={setEditableRowKeys}
    />
  );
};

export default Index;
