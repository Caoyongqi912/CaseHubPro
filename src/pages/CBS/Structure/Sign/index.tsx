import React, { useState } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormRadio,
  ProColumns,
  ProCard,
  ProFormSwitch,
} from '@ant-design/pro-components';
import { addSign } from '@/api/cbs';
import { Form, message } from 'antd';
import EditableTable from '@/components/Table/EditableTable';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-twilight';
import DrawerAceEditor from '@/pages/CBS/component/DrawerAceEditor';
import useSocket from '@/pages/CBS/component/useSocket';
import Utils from '@/pages/CBS/component/utils';

const Index = () => {
  const [form] = Form.useForm<any>();
  const { setAllLogs, setLogData, setDrawer, drawer, setRoomID, allLogs } =
    useSocket();
  const [grid, setGrid] = useState(false);
  const { CityUser, cityList } = Utils();
  const [userData, setUserData] = useState([
    {
      id: 1,
      target: '卖方',
      name: '业绩自动化',
      ssn: '370801194003195002',
      phone: '17611395912',
      // children:[
      //   {
      //     id: 1,
      //     target: '卖方',
      //     name: '业绩自动化',
      //     ssn: '370801194003195002',
      //     phone: '17611395912',
      //   }
      // ]
    },
    {
      id: 2,
      target: '买方',
      name: '大娃',
      ssn: '340403198612241549',
      phone: '15060062611',
    },
  ]);
  const [city, setCity] = useState('beijing');
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    userData.map((item: any) => item.id),
  );
  const columns: ProColumns[] = [
    {
      title: '买卖方',
      dataIndex: 'target',
      readonly: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: 'ssn',
      dataIndex: 'ssn',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
  ];

  const onFinish = async () => {
    const value = await form.validateFields();
    const body = {
      users: userData,
      ...value,
    };
    console.log(body);
    const { code, data, msg } = await addSign(body);
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
        <ProForm layout={'horizontal'} form={form} onFinish={onFinish}>
          <ProFormRadio.Group
            name="city"
            layout="horizontal"
            initialValue={city}
            label="城市"
            options={cityList}
            fieldProps={{
              onChange: ({ target }) => {
                console.log('==', target.value);
                setCity(target.value);
                form.setFieldValue('userID', CityUser[target.value]);
              },
            }}
          />
          <ProFormRadio.Group>
            {city === 'beijing' || city === 'nanjing' || city === 'tianjin' ? (
              <ProFormRadio.Group
                name="transfer"
                layout="horizontal"
                initialValue={'1'}
                label="是否委托过户"
                options={[
                  {
                    label: '委托',
                    value: '1',
                  },
                  {
                    label: '非委托',
                    value: '0',
                  },
                ]}
              />
            ) : null}
            {city === 'beijing' ? (
              <ProFormSwitch
                fieldProps={{
                  onChange: setGrid,
                }}
                initialValue={false}
                label="华熙存量房"
                name="hx"
              />
            ) : null}
          </ProFormRadio.Group>

          <ProForm.Group>
            <ProFormText
              name="userID"
              label="用户ID"
              initialValue={'625005'}
              tooltip={'即成交人'}
              required={true}
              rules={[{ required: true, message: '登陆人ID必填' }]}
            />
            <ProFormText
              name="houseID"
              label="房源ID"
              required={true}
              rules={[{ required: true, message: '房源ID必填' }]}
            />
            <ProFormText
              name="amount"
              label="全款成交价"
              tooltip={'不要传递带逗号分割的金额，要纯数字！'}
              initialValue={1000000}
              addonAfter={'元'}
            />
          </ProForm.Group>
          <EditableTable
            title={'双方信息'}
            columns={columns}
            dataSource={userData}
            setDataSource={setUserData}
            editableKeys={editableKeys}
            setEditableRowKeys={setEditableRowKeys}
            recordCreatorProps={false}
          />

          <h4 style={{ color: 'red' }}>录入完成后注意佣金字段是否正确 !!!</h4>
        </ProForm>
      </ProCard>
    </>
  );
};

export default Index;
