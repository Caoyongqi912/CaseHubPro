import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Input, Row, Select, Tabs, Radio, Card } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import EditableTable from '@/components/Table/EditableTable';
import CodeEditor from '@/pages/Case/CaseAPI/component/Postman/CodeEditor';
import { runApiDemo } from '@/api/interface';
import { ProColumns } from '@ant-design/pro-table/lib/typing';
import {
  setBody,
  SetFormInstance,
  setHeaders,
  setParams,
} from '@/pages/Case/CaseAPI/func';

const { Option } = Select;
const { TabPane } = Tabs;

interface SelfProps {
  setFormInstance: SetFormInstance;
  SH: setHeaders;
  SB: setBody;
  SP: setParams;
  step: number;
  setResponse: any;
  apiStepDetail?: any;
}

interface KV {
  id: number;
  key: any;
  value: any;
  desc: string;
}

const PostmanBody: FC<SelfProps> = (props) => {
  const { apiStepDetail, step } = props;
  const { setFormInstance, setResponse } = props;
  const [form] = Form.useForm();
  const [method, setMethod] = useState('GET');
  const [paramsData, setParamsData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [body, setBody] = useState();
  const [bodyType, setBodyType] = useState(0);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    paramsData.map((item: any) => item.id),
  );
  const [headersKeys, setHeadersKeys] = useState<React.Key[]>(() =>
    headers.map((item: any) => item.id),
  );

  useEffect(() => {
    if (apiStepDetail) {
      form.setFieldsValue(props.apiStepDetail);
      setHeaders(apiStepDetail.headers);
      setParamsData(apiStepDetail.params);
      if (apiStepDetail.body) {
        setBody(apiStepDetail.body);
        setBodyType(1);
      }
    }
    setFormInstance(form);
  }, [apiStepDetail]);

  useEffect(() => {
    if (headers && headers.length > 0) {
      props.SH(step, headers);
    }
  }, [headers]);

  useEffect(() => {
    if (body) {
      props.SB(step, body);
    }
  }, [body]);
  useEffect(() => {
    if (paramsData) {
      props.SP(step, paramsData);
    }
  }, [paramsData]);

  const columns = (columnType: string): ProColumns[] => {
    return [
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
    } else if (bd === 1) {
      return (
        <Row style={{ marginTop: 12 }}>
          <Col span={24}>
            <Card bodyStyle={{ padding: 0 }}>
              <CodeEditor
                value={JSON.stringify(body)}
                onChange={(e) => {
                  setBody(JSON.parse(e!));
                }}
              />
            </Card>
          </Col>
        </Row>
      );
    }
  };

  const sendReq = async () => {
    const req = form.getFieldsValue();
    req.headers = headers;
    if (body) {
      req.body = body;
    }
    const res = await runApiDemo(req);
    if (res.code === 0) {
      setResponse(res.data);
    }
  };
  const reqMethod = (
    <>
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
    </>
  );
  return (
    <Form form={form}>
      <Card style={{ width: '100%' }}>
        <Row gutter={[8, 8]}>
          <Col span={20}>
            <Form layout="inline" form={form}>
              <Row gutter={[8, 8]}>
                <Col span={16}>
                  <Form.Item
                    name={'name'}
                    label={'步骤名称'}
                    required={true}
                    rules={[{ required: true, message: '步骤名称不能为空' }]}
                  >
                    <Input
                      allowClear
                      autoComplete={'off'}
                      placeholder={'请输入步骤名称'}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name={'desc'} label={'步骤描述'}>
                    <Input allowClear autoComplete={'off'} />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item
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
                      {reqMethod}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name={'url'}
                    label={'请求地址'}
                    rules={[{ required: true, message: '请输入请求url' }]}
                  >
                    <Input
                      placeholder="请输入要请求的url"
                      allowClear
                      autoComplete={'off'}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col span={4}>
            <div style={{ float: 'right' }}>
              <Button onClick={sendReq} type={'primary'}>
                Send
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
      <Card style={{ width: '100%', marginTop: 5 }}>
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
                  <Radio value={1}>json</Radio>
                </Radio.Group>
              </Row>
              {getBody(bodyType)}
            </TabPane>
          </Tabs>
        </Row>
      </Card>
    </Form>
  );
};

export default PostmanBody;
