import React, { FC, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Input, Radio, Row, Select, Tabs } from 'antd';
import {
  SetBody,
  SetFormInstance,
  SetHeaders,
  SetParams,
} from '@/pages/Case/CaseAPI/MyHook/func';
import { runApiDemo } from '@/api/interface';
import MonacoEditorComponent from '@/components/CodeEditor/MonacoEditorComponent';
import HeaderTable from '@/pages/Case/CaseAPI/component/Postman/HeaderTable';
import ParamsTable from '@/pages/Case/CaseAPI/component/Postman/ParamsTable';
import { queryHost } from '@/api/host';

const { Option } = Select;
const { TabPane } = Tabs;

interface SelfProps {
  setFormInstance: SetFormInstance;
  SetHeaders: SetHeaders;
  SetBody: SetBody;
  SetParams: SetParams;
  step: number;
  setResponse: any;
  apiStepDetail?: any;
  ExtractsRef: any;
  AssertsRef: any;
}

const PostmanBody: FC<SelfProps> = (props) => {
  const {
    apiStepDetail,
    step,
    ExtractsRef,
    AssertsRef,
    SetParams,
    SetHeaders,
    SetBody,
  } = props;
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
  const [hosts, setHosts] = useState<{ value: string; label: string }[]>([]);

  /**
   * 请求hosts setHosts
   */
  useEffect(() => {
    queryHost().then(({ code, data }) => {
      if (code === 0) {
        const _host = data.map((v) => ({
          value: `${v.host}${v.port ? `:${v.port}` : ''}`,
          label: v.name,
        }));
        setHosts(_host);
      }
    });
  }, []);

  /**
   * apiStepDetail 存在 则渲染表单
   */
  useEffect(() => {
    if (apiStepDetail) {
      form.setFieldsValue(apiStepDetail);
      setHeaders(apiStepDetail.headers);
      setParamsData(apiStepDetail.params);
      if (apiStepDetail.body) {
        setBody(apiStepDetail.body);
        setBodyType(1);
      }
    }
    setFormInstance(form);
  }, [apiStepDetail]);

  /**
   * header body params 更改
   */
  useEffect(() => {
    if (headers) {
      SetHeaders(step, headers);
    }
    if (body) {
      SetBody(step, body);
    }
    if (paramsData) {
      SetParams(step, paramsData);
    }
  }, [headers, body, paramsData]);

  const selectBefore = (
    <Form.Item name="host" noStyle>
      {hosts && hosts.length > 0 ? (
        <Select
          // defaultValue={hosts[0].value}
          placeholder={'选择host'}
          style={{ width: 100 }}
        >
          <Option value={null}>
            没有?
            <a style={{ float: 'right', fontSize: 12 }} href={'/project/host'}>
              去添加
            </a>
          </Option>
          {hosts.map((value, index) => (
            <Option
              key={index}
              value={value.value}
              label={value.label}
              onSelect={() => {
                console.log(value.value);
                form.setFieldValue('host', value.value);
              }}
            >
              {value.label}
            </Option>
          ))}
        </Select>
      ) : null}
    </Form.Item>
  );
  const bodyChange = (value: any) => {
    setBody(JSON.parse(value));
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
              <MonacoEditorComponent
                defaultValue={JSON.stringify(body)}
                language={'json'}
                onChange={bodyChange}
              />
            </Card>
          </Col>
        </Row>
      );
    }
  };

  // 单步骤调试
  const sendReq = async () => {
    const info: any = {};
    const values = await form.validateFields();
    info.step = {
      ...values,
      headers: headers,
      step: step,
      body: body ? body : null,
    };
    info.step.extracts =
      ExtractsRef?.current[step] ?? apiStepDetail?.extracts ?? [];
    info.step.asserts =
      AssertsRef?.current[step] ?? apiStepDetail?.asserts ?? [];
    const { code, data } = await runApiDemo(info);
    if (code === 0) {
      setResponse(data);
    }
  };

  /**
   * 请求方法枚举
   */
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
    <>
      <Form form={form}>
        <Card style={{ width: '100%' }}>
          <Row gutter={[8, 8]}>
            <Col span={20}>
              <Form layout="inline" form={form}>
                <Row gutter={[8, 8]}>
                  <Col span={8}>
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
                  <Col span={8}>
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
                        addonBefore={selectBefore}
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
                <Button type={'primary'} onClick={sendReq}>
                  Try
                </Button>
              </div>
            </Col>
          </Row>
        </Card>
        <Card style={{ width: '100%', marginTop: 5 }}>
          <Row style={{ marginTop: 8 }}>
            <Tabs defaultActiveKey="1" style={{ width: '100%' }}>
              <TabPane tab="Params" key={'1'}>
                <ParamsTable
                  paramsData={paramsData}
                  setParamsData={setParamsData}
                  editableKeys={editableKeys}
                  setEditableRowKeys={setEditableRowKeys}
                  form={form}
                />
              </TabPane>
              <TabPane tab="Headers" key={'2'}>
                <HeaderTable
                  headers={headers}
                  setHeaders={setHeaders}
                  headersKeys={headersKeys}
                  setHeadersKeys={setHeadersKeys}
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
    </>
  );
};

export default PostmanBody;
