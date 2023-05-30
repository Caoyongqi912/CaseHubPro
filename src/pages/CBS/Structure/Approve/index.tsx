import React from 'react';
import {
  ProCard,
  ProForm,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { Form, message, notification } from 'antd';
import { buyApprove, perfApprove } from '@/api/cbs';

const Index = () => {
  const [buy_form] = Form.useForm<any>();
  const [approve_form] = Form.useForm<any>();

  const buy_finish = async () => {
    const value = await buy_form.validateFields();

    const { code, msg } = await buyApprove(value);
    if (code === 0) {
      message.success(msg);
      notification.open({
        message: '审批完成',
        description: msg,
      });
    } else {
      message.error(msg);
    }
  };
  const approve_finish = async () => {
    const value = await approve_form.validateFields();

    const { code, msg } = await perfApprove(value);
    if (code === 0) {
      message.success(msg);
      notification.open({
        message: '审批完成',
        description: msg,
      });
    } else {
      message.error(msg);
    }
  };
  return (
    <div>
      <ProCard>
        <p>公司平台补业绩</p>
        <ProForm form={buy_form} layout={'horizontal'} onFinish={buy_finish}>
          <ProFormRadio.Group
            name="city"
            layout="horizontal"
            initialValue={'beijing'}
            label="城市"
            options={[
              {
                label: '北京',
                value: 'beijing',
              },
            ]}
          />
          <ProForm.Group>
            <ProFormText
              name="conId"
              label="合同conId编号"
              required={true}
              rules={[{ required: true, message: '合同conId必填' }]}
            />
          </ProForm.Group>
        </ProForm>
      </ProCard>
      <br />
      <ProCard>
        <p>业绩申请单</p>
        <ProForm
          layout={'horizontal'}
          form={approve_form}
          onFinish={approve_finish}
        >
          <ProFormRadio.Group
            name="city"
            layout="horizontal"
            initialValue={'beijing'}
            label="城市"
            options={[
              {
                label: '北京',
                value: 'beijing',
              },
            ]}
          />
          <ProForm.Group>
            <ProFormText
              name="uid"
              label="发起人ID"
              required={true}
              rules={[{ required: true, message: '发起人ID必填' }]}
            />
            <ProFormText
              name="applyNo"
              label="审批流ID"
              required={true}
              rules={[{ required: true, message: '审批编号必填' }]}
            />
          </ProForm.Group>
        </ProForm>
      </ProCard>
    </div>
  );
};

export default Index;
