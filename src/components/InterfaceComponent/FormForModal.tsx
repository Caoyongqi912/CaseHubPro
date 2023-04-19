import React, { FC, useEffect } from 'react';
import { Form, Modal, Input, Switch, Col } from 'antd';
import { API } from '@/api';

const { Item: FormItem } = Form;

interface SelfProps {
  title: string;
  fields: any[];
  offset?: 0;
  loading?: boolean;
  record?: any;
  left?: number;
  right?: number;
  children?: any;
  Footer?: any;
  onFinish?: any;
  onCancel?: any;
  onTest?: any;
  visible?: any;
  width?: number;
  formName?: string;
}

const { TextArea } = Input;

const componentMap: API.IObjGet = {
  input: <Input />,
  textarea: <TextArea />,
  switch: <Switch />,
};

const getComponent = (
  type: string,
  placeholder: string,
  component?: React.ReactNode,
) => {
  const defaultComponent = componentMap[type];
  return component ?? React.cloneElement(defaultComponent, { placeholder });
};

const FormForModal: FC<SelfProps> = (props) => {
  const [form] = Form.useForm();
  const {
    formName,
    fields,
    onTest,
    title,
    offset,
    loading,
    record,
    left,
    right,
    Footer,
    onFinish,
    onCancel,
    visible,
    width,
  } = props;
  const onOk = () => {
    form.validateFields().then((values) => {
      onFinish(values);
    });
  };
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(record);
  }, [record]);
  const layout = {
    labelCol: { span: left },
    wrapperCol: { span: right },
  };
  return (
    <Modal
      style={{ marginTop: offset }}
      confirmLoading={loading}
      footer={
        Footer !== undefined ? (
          <Footer
            onOk={onOk}
            onCancel={onCancel}
            onTest={() => {
              form.validateFields().then((values) => {
                onTest(values);
              });
            }}
          />
        ) : undefined
      }
      title={title}
      width={width}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form
        form={form}
        {...layout}
        name={formName}
        initialValues={record}
        onFinish={onFinish}
      >
        {fields.map((item, index) => (
          <Col span={item.span || 24} key={index}>
            <FormItem
              label={item.label}
              colon={item.colon || true}
              initialValue={item.initialValue}
              rules={[{ required: item.required, message: item.message }]}
              name={item.name}
              valuePropName={item.valuePropName || 'value'}
            >
              {getComponent(item.type, item.placeholder, item.component)}
            </FormItem>
          </Col>
        ))}
      </Form>
    </Modal>
  );
};

export default FormForModal;
