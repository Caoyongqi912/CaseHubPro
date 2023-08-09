import React, { useEffect, useState } from 'react';
import { Col, Form, message, Row, Select } from 'antd';
import {
  ProCard,
  ProForm,
  ProFormRadio,
  ProFormText,
  ProFormSelect,
} from '@ant-design/pro-components';
import Utils from '@/pages/CBS/component/utils';
import { assignWith } from 'lodash';
import DrawerAceEditor from '@/pages/CBS/component/DrawerAceEditor';
import useSocket from '@/pages/CBS/component/useSocket';
import { insertHouse, InsertHouseType } from '@/api/cbs';

const houseOwn = [
  { label: '商品房', value: '1' },
  { label: '经济适用房', value: '42' },
  { label: '解困房', value: '61' },
  { label: '存量房', value: '64' },
  { label: '房改房', value: '65' },
  { label: '拆迁回迁房', value: '66' },
  { label: '无证', value: '67' },
  { label: '上海：已购公房优惠价/标准价央产', value: '21' },
  { label: '上海：已购公房优惠价/标准价非央产', value: '23' },
  { label: '上海：自住商品房', value: '8' },
  { label: '上海：限价商品房', value: '9' },
  { label: '上海：集体产权', value: '5' },
  { label: '上海：已购公房（售后公房)', value: '40' },
  { label: '上海：使用权房', value: '41' },
  { label: '上海：经济适用房', value: '42' },
  { label: '上海：商品住房', value: '43' },
  { label: '上海：非居住用房', value: '44' },
  { label: '上海：工业厂房', value: '45' },
  { label: '上海：车库', value: '46' },
  { label: '上海：办公楼', value: '47' },
  { label: '上海：动迁安置房', value: '48' },
  { label: '其他', value: '11' },
];

const Index = () => {
  const [form] = Form.useForm<InsertHouseType>();
  const { cityList, CityBuildingName, CityUser, CityBuilder, BusinessType } =
    Utils();
  const { setAllLogs, setLogData, setDrawer, drawer, setRoomID, allLogs } =
    useSocket();

  const [city, setCity] = useState('hangzhou');
  const [cityUser, setCityUser] = useState(CityUser[city]);
  const [cityBuilder, setCityBuilder] = useState(CityBuilder[city]);
  const [buildingName, setBuildingName] = useState(CityBuildingName[city]);

  const onFinish = async () => {
    const values = form.getFieldsValue();
    console.log(values);
    const { code, data, msg } = await insertHouse(values);
    if (code === 0) {
      setDrawer(true);
      setRoomID(data);
    } else {
      message.error(msg);
    }
  };

  return (
    <>
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
        <ProForm layout="horizontal" form={form} onFinish={onFinish}>
          <Row>
            <Col span={24}>
              <ProFormRadio.Group
                name="city"
                layout="horizontal"
                initialValue={city}
                required={true}
                label="目标城市"
                options={cityList}
                fieldProps={{
                  onChange: ({ target }) => {
                    console.log('==', target.value);
                    setCity(target.value);
                    form.setFieldValue(
                      'buildingName',
                      CityBuildingName[target.value],
                    );
                    form.setFieldValue('username', CityUser[target.value]);
                    form.setFieldValue('builder', CityBuilder[target.value]);
                  },
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <ProFormText
                name="buildingName"
                label="楼盘名称"
                required={true}
                initialValue={buildingName}
                tooltip="名称尽可能全称呼，避免模糊搜索查询不到"
                rules={[{ required: true, message: '楼盘名称必填' }]}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <ProFormText
                name="username"
                label="房源录入人ID"
                initialValue={cityUser}
                required={true}
                rules={[{ required: true, message: '录入人ID必填' }]}
              />
            </Col>
            <Col span={6}>
              <ProFormText
                name="builder"
                tooltip="可操作楼盘库纠错权限的人，不用要使用可切换城市大权限的账号、以免登陆失败"
                label="楼盘库专员ID"
                initialValue={cityBuilder}
                required={true}
                rules={[{ required: true, message: '专员ID必填' }]}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <ProFormText
                name="name"
                label="业主名称"
                initialValue="大娃"
                required={true}
                rules={[{ required: true, message: '业主称必填' }]}
              />
            </Col>
            <Col span={6}>
              <ProFormText
                name="phone"
                label="业主电话"
                initialValue="17611395999"
                required={true}
                rules={[{ required: true, message: '业主电话必填' }]}
              />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <ProFormSelect
                name="houseOwn"
                label="房屋性质"
                showSearch={true}
                fieldProps={{
                  labelInValue: false,
                  defaultValue: '1',
                  style: {
                    minWidth: 200,
                  },
                }}
                required={true}
                initialValue={'1'}
                options={houseOwn}
                rules={[{ required: true, message: '房屋性质必选' }]}
              />
            </Col>
            <Col span={6}>
              <ProFormSelect
                name="businessType"
                label="房屋类型"
                fieldProps={{
                  labelInValue: false,
                  defaultValue: '1',
                  style: {
                    minWidth: 200,
                  },
                }}
                required={true}
                initialValue={'2'}
                options={BusinessType}
                rules={[{ required: true, message: '房屋类型必选' }]}
              />
            </Col>
          </Row>
        </ProForm>
      </ProCard>
    </>
  );
};

export default Index;
