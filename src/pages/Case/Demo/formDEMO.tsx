import React, { FC, useEffect } from 'react';
import { Button, Form, Input } from 'antd';

interface SelfProps {
  setFormInstance: any;
  current: number;
  v?: any[];
  setV?: any;
}

const FormDemo: FC<SelfProps> = ({ setFormInstance, current }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    setFormInstance({ curr: current, form: form });
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
