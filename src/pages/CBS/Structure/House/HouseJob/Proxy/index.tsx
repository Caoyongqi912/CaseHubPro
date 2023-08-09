import React, { FC, useState } from 'react';
import { DatePicker, Form, message } from 'antd';
import Utils from '@/pages/CBS/component/utils';
import { addProxy, AddProxyType } from '@/api/cbs';
import {
  ProCard,
  ProForm,
  ProFormRadio,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';

interface SelfProps {
  setDrawer: any;
  setRoomID: any;
}

const Index: FC<SelfProps> = ({ setDrawer, setRoomID }) => {
  const [form] = Form.useForm<any>();
  const { CityUser, cityList, BusinessType } = Utils();
  const [pCity, setPCity] = useState('beijing');
  const [pCityUser, setPityUser] = useState(CityUser[pCity]);
  const [pGrid, setPGrid] = useState(true);
  const onProxyFinish = async () => {
    const value = form.getFieldsValue();
    const { time, businessType, approve, ...rest } = value;
    const [start_time, end_time] = time.map(
      (date: any) => date.toISOString().split('T')[0],
    );
    const body: AddProxyType = {
      start_time,
      end_time,
      businessType,
      approve,
      ...rest,
    };
    const { code, data, msg } = await addProxy(body);
    if (code === 0) {
      setDrawer(true);
      setRoomID(data);
    } else {
      message.error(msg);
    }
  };

  return (
    <ProCard title={'添加草拟委托'} style={{ marginTop: 10 }}>
      <ProForm
        layout={'horizontal'}
        title={'添加钥匙协议'}
        form={form}
        onFinish={onProxyFinish}
      >
        <ProFormRadio.Group
          name="city"
          layout="horizontal"
          label="城市"
          initialValue={pCity}
          options={cityList}
          fieldProps={{
            onChange: ({ target }) => {
              console.log('==', target.value);
              setPCity(target.value);
              form.setFieldValue('userId', CityUser[target.value]);
            },
          }}
        />
        <ProForm.Group>
          <ProFormText
            name="userId"
            label="用户ID"
            initialValue={pCityUser}
            tooltip={'即委托人'}
            required={true}
            rules={[{ required: true, message: '登陆人ID必填' }]}
          />
          <ProFormText
            name="houseId"
            label="房源ID"
            required={true}
            rules={[{ required: true, message: '房源ID必填' }]}
          />
          <ProFormText
            name="price"
            label="委托价格"
            tooltip={'不要传入带【,】分隔符'}
            initialValue={'100'}
            addonAfter={'万'}
            required={true}
            rules={[{ required: true, message: '委托价格必填' }]}
          />
          <ProFormText
            name="area"
            label="面积"
            initialValue={'100'}
            required={true}
            rules={[{ required: true, message: '面积必填' }]}
          />
          <ProFormText
            name="floor"
            label="楼层"
            initialValue={'1'}
            required={true}
            rules={[{ required: true, message: '楼层必填' }]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormRadio.Group
            name="businessType"
            layout="horizontal"
            initialValue={'2'}
            label="房源类型"
            required={true}
            options={BusinessType}
          />
          <ProFormSwitch
            fieldProps={{
              onChange: setPGrid,
            }}
            initialValue={pGrid}
            label="是否需要完成审批"
            name="approve"
          />
        </ProForm.Group>

        <Form.Item
          label={'起始时间'}
          name="time"
          required={true}
          tooltip={'非北京随意填写'}
        >
          {/*// @ts-ignore*/}
          <DatePicker.RangePicker />
        </Form.Item>

        <p style={{ color: 'red' }}>只调试了北京杭州、其他城市情况未知</p>
      </ProForm>
    </ProCard>
  );
};

export default Index;
