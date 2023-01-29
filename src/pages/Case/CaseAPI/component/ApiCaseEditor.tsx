import React, { FC, useState } from 'react';
import { Button, Card, Col, Row, Form, Input, Switch } from 'antd';
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
  form: any;
  caseDetail: API.ICaseDetail[];
  body: string;
  bodyType: number;
  setBody: any;
  setBodyType: any;
  headers: Array<any>;
  setHeaders: any;
  formData: Array<any>;
  setFromData: any;
}

const ApiCaseEditor: FC<SelfProps> = (props) => {
  const { onSubmit, form, caseDetail } = props;

  return (
    <Form form={form}>
      <Card
        title={
          <span style={{ fontWeight: 700, fontSize: '16px' }}>
            API CASE INFO
          </span>
        }
        extra={
          <Button
            type="primary"
            onClick={async () => {
              await onSubmit();
            }}
          >
            提交
          </Button>
        }
      >
        <Row gutter={[8, 8]}>
          {caseDetail.map((item) => (
            <Col span={item.span || 24}>
              <FormItem
                label={item.label}
                colon={true}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                rules={[{ required: item.required, message: item.message }]}
                name={item.name}
                valuePropName={'value'}
              >
                {getComponent(item.type, item.placeholder!, item.component)}
              </FormItem>
            </Col>
          ))}
        </Row>

        <Row style={{ marginTop: 8 }}>
          <Col span={24}>
            <ApiCaseBottom {...props} />
          </Col>
        </Row>
      </Card>
    </Form>
  );
};

export default ApiCaseEditor;
