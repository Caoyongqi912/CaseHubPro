import React, { FC } from 'react';
import { Button, Form, Input } from 'antd';

interface selfProps {
  form?: any;
}

const FormDemo: FC<selfProps> = ({ form }) => {
  console.log('---', form.getFieldsValue());
  return (
    <Form
      form={form}
      name={'basic'}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ username: 'ads', password: 'ASD' }}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
  );
};

export default FormDemo;
