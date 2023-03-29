import React, { FC, useState } from 'react';
import EditableTable from '@/components/Table/EditableTable';
import { ProColumns } from '@ant-design/pro-table/lib/typing';
import { Select } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import HeadersEnum from '@/pages/Case/CaseAPI/component/Postman/HeaderTable/HeadersEnum';

interface SelfProps {
  headers: any;
  setHeaders: any;
  headersKeys: any;
  setHeadersKeys: any;
}

const Index: FC<SelfProps> = (props) => {
  const { headers, setHeaders, headersKeys, setHeadersKeys } = props;
  const [data, setData] = useState<{ value: string; text: any }[]>([]);
  const [value, setValue] = useState<string>();

  const handleSearch = (newValue: string) => {
    if (newValue) {
      const filteredOptions = Object.keys(HeadersEnum)
        .filter((item) =>
          HeadersEnum[item].text.toLowerCase().includes(newValue.toLowerCase()),
        )
        .map((key) => ({ value: key, text: HeadersEnum[key].text }));
      setData(
        filteredOptions.length > 0
          ? filteredOptions
          : [{ value: newValue, text: newValue }],
      );
    } else {
      setData([]);
    }
  };
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };
  const HeaderColumns: ProColumns[] = [
    {
      title: 'key',
      key: 'key',
      dataIndex: 'key',
      renderFormItem: (item, config, form) => {
        return (
          <Select
            showSearch
            value={value}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}
            options={(data || []).map((d) => ({
              value: d.value,
              label: d.text,
            }))}
          />
        );
      },
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
          <DeleteTwoTone
            style={{ cursor: 'pointer', marginLeft: 8 }}
            onClick={() => {
              const data = headers.filter((item: any) => item.id !== record.id);
              setHeaders(data);
            }}
            twoToneColor="#eb2f96"
          />
        );
      },
    },
  ];

  return (
    <EditableTable
      columns={HeaderColumns}
      dataSource={headers}
      setDataSource={setHeaders}
      editableKeys={headersKeys}
      setEditableRowKeys={setHeadersKeys}
    />
  );
};
export default Index;
