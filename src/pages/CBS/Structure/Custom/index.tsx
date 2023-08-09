import React from 'react';
import { DatePicker, Form, message } from 'antd';
import DrawerAceEditor from '@/pages/CBS/component/DrawerAceEditor';
import {
  ProCard,
  ProForm,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { addCProxy, addShowing, IAddCProxy } from '@/api/cbs';
import useSocket from '@/pages/CBS/component/useSocket';
import Utils from '@/pages/CBS/component/utils';

const Index = () => {
  const [form] = Form.useForm<any>();
  const [proxyForm] = Form.useForm<any>();
  const { setAllLogs, setLogData, setDrawer, drawer, setRoomID, allLogs } =
    useSocket();
  const { CityUser, cityList, BusinessType } = Utils();

  const onFinish = async () => {
    const value = await form.validateFields();

    console.log(value);
    const { code, data, msg } = await addShowing(value);
    if (code === 0) {
      setDrawer(true);
      setRoomID(data);
    } else {
      message.error(msg);
    }
  };

  const onProxyFinish = async () => {
    const value = await proxyForm.validateFields();
    const start_time = value.time[0].toISOString().split('T')[0];
    const end_time = value.time[1].toISOString().split('T')[0];
    const body: IAddCProxy = {
      city: value.city,
      clientId: value.clientId,
      userId: value.userId,
      start_time: start_time,
      end_time: end_time,
      businessType: value.businessType,
    };
    console.log(body);
    const { code, data, msg } = await addCProxy(body);
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
      <ProCard title={'添加客源'}>
        <ProForm
          layout={'horizontal'}
          form={form}
          onFinish={onFinish}
          title={'添加客源与带看'}
        >
          <ProFormRadio.Group
            name="city"
            layout="horizontal"
            initialValue={'beijing'}
            label="城市"
            options={cityList}
          />
          <ProForm.Group>
            <ProFormText
              name="userId"
              label="经纪人ID"
              required={true}
              rules={[{ required: true, message: '经纪人ID必填' }]}
            />
            <ProFormText
              name="houseID"
              label="房源ID"
              tooltip={'传递就是带看，不传递就是单纯得添加客源'}
            />
          </ProForm.Group>
          <ProFormRadio.Group
            name="businessTypeID"
            layout="horizontal"
            required={true}
            initialValue={'2'}
            label={'类型'}
            options={BusinessType}
          />
        </ProForm>
      </ProCard>

      <ProCard title={'添加草拟委托'} style={{ marginTop: 20 }}>
        <ProForm
          layout={'horizontal'}
          form={proxyForm}
          onFinish={onProxyFinish}
        >
          <ProFormRadio.Group
            name="city"
            layout="horizontal"
            initialValue={'beijing'}
            label="城市"
            options={cityList}
          />
          <ProForm.Group>
            <ProFormText
              name="userId"
              label="经纪人ID"
              required={true}
              rules={[{ required: true, message: '经纪人ID必填' }]}
            />
            <ProFormText
              name="clientId"
              label="客户ID"
              tooltip={'不传就新造一个客户'}
              required={false}
            />
            <ProFormRadio.Group
              name="businessType"
              layout="horizontal"
              required={true}
              initialValue={'2'}
              label={'类型'}
              options={BusinessType}
            />
          </ProForm.Group>
          <Form.Item label={'起始时间'} name="time" required={true}>
            {/*// @ts-ignore*/}
            <DatePicker.RangePicker />
          </Form.Item>
        </ProForm>
      </ProCard>
    </div>
  );
};

export default Index;
