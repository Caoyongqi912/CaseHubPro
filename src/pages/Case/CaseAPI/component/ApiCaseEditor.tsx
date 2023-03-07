import React, { FC, useState } from 'react';
import { Button, Card, Col, Row, Form, Input, FormInstance } from 'antd';
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
import HostDropdown from '@/pages/Case/CaseAPI/component/HostDropdown';

const { TextArea } = Input;
const FormItem = Form.Item;

const getComponent = (
  type: string,
  placeholder: string,
  component: any,
  read: boolean,
) => {
  if (component) {
    return component({ disabled: read });
  }
  if (type === 'input') {
    return <Input placeholder={placeholder} disabled={read} />;
  }
  if (type === 'textarea') {
    return <TextArea placeholder={placeholder} disabled={read} />;
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
  extracts: any;
  asserts: any;
  apiStepsDetail?: API.IInterfaceStep[];
  isDetail?: boolean;
  run?: Function;
}

const ApiCaseEditor: FC<SelfProps> = (props) => {
  const { onSubmit, form, caseInfo, run, isDetail } = props;
  const [detail, setDetail] = useState(isDetail);
  const cardTitle = (
    <span style={{ fontWeight: 700, fontSize: '16px' }}>API CASE INFO</span>
  );
  const setD = (d: boolean) => {
    setDetail(d);
  };
  const cardExtra = (
    <>
      {detail ? (
        <>
          <HostDropdown run={run!} buttonName={'RUN'} />
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
      )}
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
                  {getComponent(
                    item.type,
                    item.placeholder!,
                    item.component,
                    detail!,
                  )}
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
