import React, { FC, useEffect } from 'react';
import { Button, Form, Input } from 'antd';

interface SelfProps {
  getFormInstance: any;
  v?: any[];
  setV?: any;
}

const FormDemo: FC<SelfProps> = ({ getFormInstance }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    getFormInstance(form);
  }, []);
  return (
    <Form form={form} autoComplete="off">
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default FormDemo;
