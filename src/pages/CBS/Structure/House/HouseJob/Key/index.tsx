import React, { FC, useState } from 'react';
import {
  ProCard,
  ProForm,
  ProFormRadio,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { DatePicker, Form, message } from 'antd';
import { addKey, AddKeyType } from '@/api/cbs';
import Utils from '@/pages/CBS/component/utils';

interface SelfProps {
  setDrawer: any;
  setRoomID: any;
}

const Index: FC<SelfProps> = ({ setDrawer, setRoomID }) => {
  const [form] = Form.useForm<any>();
  const { CityUser, cityList, BusinessType, KeyTypes } = Utils();

  const [kCity, setKCity] = useState('hangzhou');
  const [kCityUser, setKCityUser] = useState(CityUser[kCity]);
  const [grid, setGrid] = useState(true);

  const onKeyFinish = async () => {
    const { time, city, userId, houseId, keyType, approve, businessType } =
      await form.validateFields();
    const start_time = time[0].toISOString().split('T')[0];
    const end_time = time[1].toISOString().split('T')[0];
    const body: AddKeyType = {
      city,
      userId,
      houseId,
      keyType,
      start_time,
      end_time,
      approve,
      businessType,
    };
    const { code, data, msg } = await addKey(body);
    if (code === 0) {
      setDrawer(true);
      setRoomID(data);
    } else {
      message.error(msg);
    }
  };

  return (
    <ProCard title={'添加钥匙协议'}>
      <ProForm
        layout={'horizontal'}
        title={'添加钥匙协议'}
        form={form}
        onFinish={onKeyFinish}
      >
        <ProFormRadio.Group
          name="city"
          layout="horizontal"
          initialValue={kCity}
          label="城市"
          options={cityList}
          fieldProps={{
            onChange: ({ target }) => {
              console.log('==', target.value);
              setKCity(target.value);
              form.setFieldValue('userId', CityUser[target.value]);
            },
          }}
        />
        <ProForm.Group>
          <ProFormText
            name="userId"
            label="用户ID"
            initialValue={kCityUser}
            tooltip={'即钥匙人'}
            required={true}
            rules={[{ required: true, message: '登陆人ID必填' }]}
          />
          <ProFormText
            name="houseId"
            label="房源ID"
            required={true}
            rules={[{ required: true, message: '房源ID必填' }]}
          />
        </ProForm.Group>
        <ProFormRadio.Group
          name="businessType"
          layout="horizontal"
          initialValue={'2'}
          label="房源类型"
          required={true}
          options={BusinessType}
        />
        <ProFormRadio.Group
          name={'keyType'}
          layout={'horizontal'}
          initialValue={'1'}
          label={'钥匙类型'}
          required={true}
          options={KeyTypes}
        />
        <Form.Item label={'起始时间'} name="time" required={true}>
          {/*// @ts-ignore*/}
          <DatePicker.RangePicker />
        </Form.Item>

        <ProFormSwitch
          fieldProps={{
            onChange: setGrid,
          }}
          initialValue={grid}
          label="是否需要完成一二审"
          name="approve"
        />
        <p style={{ color: 'red' }}>只调试了杭州、其他城市情况未知</p>
      </ProForm>
    </ProCard>
  );
};

export default Index;
