import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Tabs,
  Radio,
  Dropdown,
  Menu,
  Card,
} from 'antd';
import {
  DeleteTwoTone,
  DownOutlined,
  EditTwoTone,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import EditableTable from '@/components/Table/EditableTable';
import CodeEditor from '@/pages/Case/CaseAPI/component/Postman/CodeEditor';
import type { MenuProps } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

const { Option } = Select;
const { TabPane } = Tabs;

interface SelfProps {
  form: any;
  body: string;
  bodyType: number;
  setBody: any;
  setBodyType: any;
  headers: Array<any>;
  setHeaders: any;
  formData: Array<any>;
  setFromData: any;
}

const columns = (columnType: string) => {
  return [
    {
      title: 'KEY',
      key: 'key',
      dataIndex: 'key',
    },
    {
      title: 'VALUE',
      key: 'value',
      dataIndex: 'value',
    },
    {
      title: 'DESCRIPTION',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record) => {
        return (
          <>
            <EditTwoTone
              style={{ cursor: 'pointer' }}
              onClick={() => {
                // setEditableRowKeys([record.id]);
              }}
            />
            <DeleteTwoTone
              style={{ cursor: 'pointer', marginLeft: 8 }}
              onClick={() => {
                // onDelete(columnType, record.id);
              }}
              twoToneColor="#eb2f96"
            />
          </>
        );
      },
    },
  ];
};

const PostmanBody: FC<SelfProps> = (props, context) => {
  const {
    body,
    setBody,
    headers,
    setBodyType,
    setHeaders,
    setFromData,
    formData,
    form,
    bodyType,
  } = props;
  const [method, setMethod] = useState('GET');
  const [paramsData, setParamsData] = useState([]);
  const [editableKeys, setEditableRowKeys] = useState(() =>
    paramsData.map((item) => item.id),
  );
  const [headersKeys, setHeadersKeys] = useState(() =>
    headers.map((item) => item.id),
  );
  const [rawType, setRawType] = useState('JSON');

  // 根据paramsData拼接url
  const joinUrl = (data) => {
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
    // setUrl(tempUrl);
    form.setFieldsValue({ url: tempUrl });
  };

  const getBody = (bd) => {
    if (bd === 0) {
      return (
        <div
          style={{ height: '20vh', lineHeight: '20vh', textAlign: 'center' }}
        >
          This request does not have a body
        </div>
      );
    }
    if (bd === 2) {
      return (
        <div
          style={{ height: '20vh', lineHeight: '20vh', textAlign: 'center' }}
        >
          This request does not have a body
        </div>
      );
    }
    // if (bd === 2) {
    //   return <FormData ossFileList={ossFileList} dataSource={formData} setDataSource={setFormData}/>
    // }
    return (
      <Row style={{ marginTop: 12 }}>
        <Col span={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <CodeEditor language={rawType} />
          </Card>
        </Col>
      </Row>
    );
  };

  useEffect(() => {
    setEditableRowKeys(paramsData.map((v) => v.id));
  }, [paramsData]);

  const prefixSelector = (
    <Form.Item name="base_path" noStyle>
      <Select
        style={{ width: 130 }}
        placeholder="选择BasePath"
        showSearch
        allowClear
        optionLabelProp="label"
      >
        <Option value={null} label="无">
          无
          <a
            style={{ float: 'right', fontSize: 12 }}
            href="/#/config/address"
            target="_blank"
          >
            去配置
          </a>
        </Option>
      </Select>
    </Form.Item>
  );

  const items: MenuProps['items'] = [
    {
      label: (
        <a
          onClick={() => {
            setRawType('JSON');
          }}
        >
          JSON
        </a>
      ),
      key: '0',
    },
    {
      label: (
        <a
          onClick={() => {
            setRawType('TEXT');
          }}
        >
          TEXT
        </a>
      ),
      key: '1',
    },
  ];
  return (
    <Form form={form}>
      <Row gutter={[8, 8]}>
        <Col span={20}>
          <Form layout="inline" form={form}>
            <Col span={8}>
              <Form.Item
                colon={false}
                name="request_method"
                label="请求方式"
                rules={[{ required: true, message: '请选择请求方法' }]}
                initialValue={method}
              >
                <Select
                  placeholder="选择请求方式"
                  onChange={(data) => setMethod(data)}
                  style={{ width: 120, textAlign: 'left' }}
                >
                  <Option key="GET" value="GET">
                    GET
                  </Option>
                  <Option key="POST" value="POST">
                    POST
                  </Option>
                  <Option key="PUT" value="PUT">
                    PUT
                  </Option>
                  <Option key="DELETE" value="DELETE">
                    DELETE
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item
                name={'url'}
                colon={false}
                label={'请求地址'}
                rules={[{ required: true, message: '请输入请求url' }]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{ width: '100%' }}
                  placeholder="请输入要请求的url"
                />
              </Form.Item>
            </Col>
          </Form>
        </Col>
        <Col span={4}>
          <div style={{ float: 'right' }}>
            <Button type={'primary'}>Send</Button>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: 8 }}>
        <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
          <TabPane tab="Params" key={'1'}>
            <EditableTable
              columns={columns('params')}
              title="Query Params"
              dataSource={paramsData}
              setDataSource={setParamsData}
              extra={joinUrl}
              editableKeys={editableKeys}
              setEditableRowKeys={setEditableRowKeys}
            />
          </TabPane>
          <TabPane tab="Headers" key={'2'}>
            <EditableTable
              columns={columns('headers')}
              title="Headers"
              dataSource={headers}
              extra={null}
              setDataSource={setHeaders}
              editableKeys={headersKeys}
              setEditableRowKeys={setHeadersKeys}
            />
          </TabPane>
          <TabPane tab="Body" key={'3'}>
            <Row>
              <Radio.Group
                defaultValue={bodyType}
                value={bodyType}
                onChange={(e) => {
                  setBodyType(e.target.value);
                }}
              >
                <Radio value={0}>none</Radio>
                <Radio value={2}>form-data</Radio>
                <Radio value={1}>raw</Radio>
              </Radio.Group>
              {bodyType === 1 ? (
                <Dropdown menu={{ items }} trigger={['click']}>
                  <a onClick={(e) => e.preventDefault()}>
                    {rawType}
                    <DownOutlined />
                  </a>
                </Dropdown>
              ) : null}
            </Row>
            {getBody(bodyType)}
          </TabPane>
        </Tabs>
      </Row>
    </Form>
  );
};

export default PostmanBody;
