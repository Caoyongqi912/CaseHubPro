import React, { FC, useEffect, useState } from 'react';
import { Card, Col, Form, Input, Radio, Row, Select, Tabs } from 'antd';
import {
  setBody,
  SetFormInstance,
  setHeaders,
  setParams,
} from '@/pages/Case/CaseAPI/func';
import HostDropdown from '@/pages/Case/CaseAPI/component/HostDropdown';
import { runApiDemo } from '@/api/interface';
import MonacoEditorComponent from '@/components/CodeEditor/MonacoEditorComponent';
import HeaderTable from '@/pages/Case/CaseAPI/component/Postman/HeaderTable';
import ParamsTable from '@/pages/Case/CaseAPI/component/Postman/ParamsTable';

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
  extracts: any;
  asserts: any;
}

const PostmanBody: FC<SelfProps> = (props) => {
  const { apiStepDetail, step, extracts, asserts } = props;
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
    if (headers) {
      props.SH(step, headers);
    }
    if (body) {
      props.SB(step, body);
    }
    if (paramsData) {
      props.SP(step, paramsData);
    }
  }, [headers, body, paramsData]);

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
  const sendReq = async (uid?: string, HostID?: string) => {
    const data: any = {};
    data.HostID = HostID;
    data.step = {
      ...form.getFieldsValue(),
      headers: headers,
      step: step,
      body: body ? body : null,
    };
    data.step.extracts =
      extracts?.current[step] || apiStepDetail?.extracts || [];
    data.step.asserts = asserts?.current[step] || apiStepDetail?.asserts || [];
    const res = await runApiDemo(data);
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
                      // addonBefore={selectBefore}
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
              <HostDropdown run={sendReq!} buttonName={'Send'} />
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
                  value={body}
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
