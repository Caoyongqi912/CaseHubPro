import React from 'react';
import {
  ProCard,
  ProForm,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { buyApprove, perfApprove } from '@/api/cbs';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-twilight';
import DrawerAceEditor from '@/pages/CBS/component/DrawerAceEditor';
import useSocket from '@/pages/CBS/component/useSocket';
import Utils from '@/pages/CBS/component/utils';

const Index = () => {
  const [buy_form] = Form.useForm<any>();
  const [approve_form] = Form.useForm<any>();
  const { cityList } = Utils();
  const { setAllLogs, setLogData, setDrawer, drawer, setRoomID, allLogs } =
    useSocket();

  const buy_finish = async () => {
    const value = await buy_form.validateFields();
    console.log(value);
    const { code, data, msg } = await buyApprove(value);
    if (code === 0) {
      setDrawer(true);
      setRoomID(data);
    } else {
      message.error(msg);
    }
  };
  const approve_finish = async () => {
    const value = await approve_form.validateFields();

    const { code, data, msg } = await perfApprove(value);
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
        <p>公司平台补业绩</p>
        <ProForm form={buy_form} layout={'horizontal'} onFinish={buy_finish}>
          <ProFormRadio.Group
            name="city"
            layout="horizontal"
            initialValue={'beijing'}
            label="城市"
            options={cityList}
          />
          <ProForm.Group>
            <ProFormText
              name="uid"
              label="发起人"
              required={true}
              rules={[{ required: true, message: '发起人必填' }]}
            />
            <ProFormText
              name="conId"
              label="合同conId编号"
              required={true}
              rules={[{ required: true, message: '合同conId必填' }]}
            />
            <ProFormText
              name="applyId"
              label="审批编号"
              required={true}
              rules={[{ required: true, message: '审批编号必填' }]}
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
            options={cityList}
          />
          <ProFormRadio.Group
            name="businessType"
            layout="horizontal"
            initialValue={'2'}
            label="合同类型"
            required={true}
            options={[
              {
                label: '租赁',
                value: '1',
              },
              {
                label: '买卖',
                value: '2',
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
