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
  getFormInstance: Function;
  headers: API.IHeaders[];
  body: any;
  SH: Function;
  SB: Function;
  SA: Function;
  SE: Function;
  SP: Function;
  stepInfo: FormInstance[];
  setStepInfo: Dispatch<SetStateAction<FormInstance[]>>;
  stepLength?: number;
  apiDetail?: API.IInterfaceStep[];
}

const ApiCaseEditor: FC<SelfProps> = (props) => {
  const { onSubmit, form, caseInfo } = props;

  const cardTitle = (
    <span style={{ fontWeight: 700, fontSize: '16px' }}>API CASE INFO</span>
  );
  const cardExtra = (
    <Button
      type="primary"
      onClick={async () => {
        await onSubmit();
      }}
    >
      提交
    </Button>
  );

  return (
    <Form form={form}>
      <Card title={cardTitle} extra={cardExtra}>
        {/*基本信息*/}
        <Row gutter={[8, 8]}>
          {caseInfo.map((item) => (
            <Col span={item.span || 20}>
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
