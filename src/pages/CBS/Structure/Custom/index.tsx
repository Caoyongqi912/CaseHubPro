import React from 'react';
import { Form, message } from 'antd';
import DrawerAceEditor from '@/pages/CBS/component/DrawerAceEditor';
import {
  ProCard,
  ProForm,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { addShowing } from '@/api/cbs';
import useSocket from '@/pages/CBS/component/useSocket';

const Index = () => {
  const [form] = Form.useForm<any>();
  const { setAllLogs, setLogData, setDrawer, drawer, setRoomID, allLogs } =
    useSocket();

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
            initialValue={'beijing'}
            label="城市"
            options={[
              {
                label: '北京',
                value: 'beijing',
              },
              {
                label: '郑州',
                value: 'zhengzhou',
              },
              {
                label: '无锡',
                value: 'wuxi',
              },
              {
                label: '南京',
                value: 'nanjing',
              },
              {
                label: '上海',
                value: 'shanghai',
              },
              {
                label: '太原',
                value: 'taiyuan',
              },
              {
                label: '天津',
                value: 'tianjin',
              },
              {
                label: '杭州',
                value: 'hangzhou',
              },
              {
                label: '苏州',
                value: 'suzhou',
              },
            ]}
          />
          <ProForm.Group>
            <ProFormText
              name="uid"
              label="经纪人ID"
              initialValue={'629710'}
              required={true}
              rules={[{ required: true, message: '经纪人ID必填' }]}
            />
            <ProFormText
              name="houseID"
              label="房源ID"
              required={true}
              rules={[{ required: true, message: '房源ID必填' }]}
            />
          </ProForm.Group>
          <ProFormRadio.Group
            name="businessTypeID"
            layout="horizontal"
            required={true}
            initialValue={'2'}
            label={'类型'}
            options={[
              {
                label: '买卖',
                value: '2',
              },
              {
                label: '租赁',
                value: '1',
              },
            ]}
          />
        </ProForm>
      </ProCard>
    </div>
  );
};

export default Index;
