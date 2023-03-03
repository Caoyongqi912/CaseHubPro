import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Row,
  Form,
  Input,
  Switch,
  FormInstance,
} from 'antd';
import { API } from '@/api';
import ApiCaseBottom from '@/pages/Case/CaseAPI/component/ApiCaseBottom';
import {
  setAsserts,
  setBody,
  setExtract,
  SetFormInstance,
  setHeaders,
  setParams,
} from '@/pages/Case/CaseAPI/func';

const { TextArea } = Input;
const FormItem = Form.Item;

const getComponent = (
  type: string,
  placeholder: string,
  component: null | React.ReactElement = null,
) => {
  if (component) {
    return component;
  }
  if (type === 'input') {
    return <Input placeholder={placeholder} />;
  }
  if (type === 'textarea') {
    return <TextArea placeholder={placeholder} />;
  }
  if (type === 'switch') {
    return <Switch />;
  }
  return null;
};

interface SelfProps {
  onSubmit: Function;
  form: FormInstance<API.IInterface>;
  caseInfo: API.IAPICaseInfoForm[];
  setFormInstance: SetFormInstance;
  SH: setHeaders;
  SB: setBody;
  SA: setAsserts;
  SE: setExtract;
  SP: setParams;
  stepInfo: any;
  apiStepsDetail?: API.IInterfaceStep[];
  isDetail?: boolean;
  run?: Function;
}

const ApiCaseEditor: FC<SelfProps> = (props) => {
  const { onSubmit, form, caseInfo, run, isDetail } = props;

  const cardTitle = (
    <span style={{ fontWeight: 700, fontSize: '16px' }}>API CASE INFO</span>
  );
  const cardExtra = (
    <>
      {props.isDetail ? (
        <Button
          type={'primary'}
          style={{ marginRight: 5 }}
          onClick={async () => {
            await run!();
          }}
        >
          Run
        </Button>
      ) : null}

      <Button
        type="primary"
        onClick={async () => {
          await onSubmit();
        }}
      >
        提交
      </Button>
    </>
  );

  return (
    <Form form={form}>
      <Card title={cardTitle} extra={cardExtra} style={{ marginTop: 5 }}>
        {/*基本信息*/}
        <Card>
          <Row gutter={24}>
            {caseInfo.map((item) => (
              <Col span={item.span || 16}>
                <FormItem
                  label={item.label}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValue={item.default}
                  rules={[{ required: item.required, message: item.message }]}
                  name={item.name}
                  valuePropName={'value'}
                >
                  {getComponent(item.type, item.placeholder!, item.component)}
                </FormItem>
              </Col>
            ))}
          </Row>
        </Card>
        {/*详情信息*/}
        <Row style={{ marginTop: 10 }}>
          <Col span={24}>
            <ApiCaseBottom {...props} />
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default ApiCaseEditor;
