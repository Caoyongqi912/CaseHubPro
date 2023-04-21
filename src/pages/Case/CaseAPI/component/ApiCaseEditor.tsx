import React, { FC, useState } from 'react';
import { Button, Card, Col, Row, Form, Input, FormInstance } from 'antd';
import { API } from '@/api';
import ApiCaseBottom from '@/pages/Case/CaseAPI/component/ApiCaseBottom';
import {
  SetExtract,
  SetBody,
  SetAsserts,
  SetFormInstance,
  SetHeaders,
  SetParams,
} from '@/pages/Case/CaseAPI/MyHook/func';

const { TextArea } = Input;
const FormItem = Form.Item;

interface SelfProps {
  onSubmit: Function;
  form: FormInstance<API.IInterface>;
  caseInfo: API.IAPICaseInfoForm[];
  setFormInstance: SetFormInstance;
  SetHeaders: SetHeaders;
  SetBody: SetBody;
  SetAsserts: SetAsserts;
  SetExtracts: SetExtract;
  SetParams: SetParams;
  stepInfo: any;
  ExtractsRef: any;
  AssertsRef: any;
  apiStepsDetail?: API.IInterfaceStep[];
  isDetail?: boolean;
  run?: any;
}

/**
 * 通过类型 返回component
 * @param type 类型
 * @param placeholder 默认
 * @param component 组件
 * @param read 可读
 */
const getComponent = (
  type: string,
  component: any,
  read: boolean,
  placeholder?: string,
) => {
  const baseProps = { placeholder, disabled: read };
  const components: API.IObjGet = {
    input: <Input {...baseProps} />,
    textarea: <TextArea {...baseProps} />,
  };
  return component ? component(baseProps) : components[type] || null;
};

const ApiCaseEditor: FC<SelfProps> = (props) => {
  const { onSubmit, form, caseInfo, run, isDetail } = props;
  const [detail, setDetail] = useState(isDetail);
  const cardTitle = (
    <span style={{ fontWeight: 700, fontSize: '16px' }}>API CASE INFO</span>
  );
  const setD = (d: boolean) => {
    setDetail(d);
  };

  const cardExtra = detail ? (
    <>
      <Button type={'primary'} style={{ marginRight: 5 }} onClick={run!}>
        RUN
      </Button>
      <Button
        type="primary"
        onClick={() => {
          setD(false);
        }}
      >
        修改
      </Button>
    </>
  ) : (
    <Button
      type="primary"
      onClick={async () => {
        setD(true);
        await onSubmit();
      }}
    >
      提交
    </Button>
  );

  const fields = caseInfo.map((field) => (
    <Col span={field.span || 16}>
      <FormItem
        label={field.label}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValue={field.default}
        rules={[{ required: field.required, message: field.message }]}
        name={field.name}
        valuePropName="value"
      >
        {getComponent(field.type, field.component, detail!, field.placeholder)}
      </FormItem>
    </Col>
  ));

  return (
    <Form form={form}>
      <Card title={cardTitle} extra={cardExtra} style={{ marginTop: 5 }}>
        {/*基本信息*/}
        <Card>
          <Row gutter={24}>{fields}</Row>
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
