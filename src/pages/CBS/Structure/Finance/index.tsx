import React, { useEffect, useState } from 'react';
import { Form, message, Radio } from 'antd';
import {
  ProCard,
  ProForm,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { collect } from '@/api/cbs';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-twilight';
import DrawerAceEditor from '@/pages/CBS/component/DrawerAceEditor';
import useSocket from '@/pages/CBS/component/useSocket';
import { API } from '@/api';
import Utils from '@/pages/CBS/component/utils';

const approve: API.IObjGet = {
  beijing: '123',
  zhengzhou: '321',
};
const Index = () => {
  const [financeForm] = Form.useForm<any>();
  const { setAllLogs, setLogData, setDrawer, drawer, setRoomID, allLogs } =
    useSocket();
  const { cityList, financeApprove, CityUser } = Utils();
  const finish = async () => {
    const value = await financeForm.validateFields();
    console.log(value);
    const { code, data, msg } = await collect(value);
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
        <p>合同费用明细 应收收齐</p>
        <ProForm form={financeForm} layout={'horizontal'} onFinish={finish}>
          <ProFormRadio.Group
            name="city"
            layout="horizontal"
            initialValue={'beijing'}
            label="目标城市"
            options={cityList}
            // @ts-ignore
            onChange={({ target }) => {
              console.log('==', target.value);
              financeForm.setFieldValue(
                'approve_by',
                financeApprove[target.value],
              );
              financeForm.setFieldValue('uid', CityUser[target.value]);
            }}
          />
          <ProForm.Group>
            <ProFormText
              name="uid"
              label="成交人"
              initialValue={'625005'}
              required={true}
              rules={[{ required: true, message: '成交人必填' }]}
            />
            <ProFormText
              name="conId"
              label="合同conId编号"
              required={true}
              rules={[{ required: true, message: '合同conId必填' }]}
            />
            <ProFormText
              name="approve_by"
              label="财务审批人ID"
              initialValue={'8128830'}
              required={true}
              rules={[{ required: true, message: '财务审批人ID' }]}
            />
          </ProForm.Group>
        </ProForm>
      </ProCard>
    </div>
  );
};

export default Index;
