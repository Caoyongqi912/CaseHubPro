import React from 'react';
import { Form, message } from 'antd';
import DrawerAceEditor from '@/pages/CBS/component/DrawerAceEditor';
import {
  ProCard,
  ProForm,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { addLease } from '@/api/cbs';
import useSocket from '@/pages/CBS/component/useSocket';

const Index = () => {
  const [form] = Form.useForm<any>();
  const { setAllLogs, setLogData, setDrawer, drawer, setRoomID, allLogs } =
    useSocket();

  const onFinish = async () => {
    const value = await form.validateFields();
    console.log(value);
    const { code, data, msg } = await addLease(value);
    if (code === 0) {
      setDrawer(true);
      setRoomID(data);
    } else {
      message.error(msg);
    }
  };
  return (
    <div>
      <DrawerAceEditor
        visible={drawer}
        onClose={() => {
          setDrawer(false);
          setAllLogs([]);
          setLogData([]);
          setRoomID(null);
        }}
        allLogs={allLogs.join('')}
      />
      <ProCard>
        <ProForm layout={'horizontal'} form={form} onFinish={onFinish}>
          <ProFormRadio.Group
            name="city"
            layout="horizontal"
            initialValue={'hangzhou'}
            label="城市"
            options={[
              {
                label: '杭州',
                value: 'hangzhou',
              },
              {
                label: '北京',
                value: 'beijing',
              },
            ]}
          />
          <ProForm.Group>
            <ProFormText
              name="userID"
              label="用户ID"
              initialValue={'624295'}
              required={true}
              rules={[{ required: true, message: '登陆人ID必填' }]}
            />
            <ProFormText
              name="houseID"
              label="租赁房源ID"
              required={true}
              rules={[{ required: true, message: '房源ID必填' }]}
            />
            <ProFormText
              name="amount"
              label="全款成交价"
              initialValue={10000}
              addonAfter={'元'}
            />
          </ProForm.Group>
        </ProForm>
      </ProCard>
    </div>
  );
};

export default Index;
