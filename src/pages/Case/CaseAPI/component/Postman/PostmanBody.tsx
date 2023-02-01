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
  stepsForm: any;
  body: string;
  bodyType: number;
  setBody: any;
  setBodyType: any;
  headers: Array<any>;
  setHeaders: any;
  formData: Array<any>;
  setFromData: any;
}

interface KV {
  id: number;
  key: any;
  value: any;
  desc: string;
}

const PostmanBody: FC<SelfProps> = (props, context) => {
  const {
    body,
    setBody,
    headers,
    setBodyType,
    setHeaders,
    stepsForm,
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
        key: 'desc',
        dataIndex: 'desc',
      },
      {
        title: '操作',
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
                  onDelete(columnType, record.id);
                }}
                twoToneColor="#eb2f96"
              />
            </>
          );
        },
      },
    ];
  };

  const onDelete = (columnType: string, key: number) => {
    if (columnType === 'params') {
      const data = paramsData.filter((item: any) => item.id !== key);
      setParamsData(data);
      joinUrl(data);
    } else {
      const data = headers.filter((item: any) => item.id !== key);
      setHeaders(data);
    }
  };

  // 根据paramsData拼接url
  const joinUrl = (data: KV[]) => {
    const url = stepsForm.getFieldValue('url');
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
    stepsForm.setFieldsValue({ url: tempUrl });
  };

  // 返回body 类型 component
  const getBody = (bd: number) => {
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
    return (
      <Row style={{ marginTop: 12 }}>
        <Col span={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <CodeEditor onChange={(e) => setBody(JSON.parse(e))} />
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <Form form={stepsForm}>
      <Row gutter={[8, 8]}>
        <Col span={20}>
          <Form layout="inline" form={stepsForm}>
            <Col span={8}>
              <Form.Item
                colon={false}
                name="method"
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
                  // addonBefore={prefixSelector}
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
                {/*<Radio value={2}>form-data</Radio>*/}
                <Radio value={1}>json</Radio>
              </Radio.Group>
            </Row>
            {getBody(bodyType)}
          </TabPane>
        </Tabs>
      </Row>
    </Form>
  );
};

export default PostmanBody;
