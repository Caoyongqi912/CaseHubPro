import React, { useEffect, useState } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormRadio,
  ProTable,
  ProColumns,
  EditableProTable,
} from '@ant-design/pro-components';
import { addSign } from '@/api/cbs';
import { Drawer, Form, message, notification, Tooltip } from 'antd';
import EditableTable from '@/components/Table/EditableTable';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-twilight';
import io from 'socket.io-client';

const Index = () => {
  const [form] = Form.useForm<any>();
  const [userData, setUserData] = useState([
    {
      id: 1,
      target: '卖方',
      name: '业绩自动化',
      ssn: '370801194003195002',
      phone: '17611395912',
    },
    {
      id: 2,
      target: '买方',
      name: '大娃',
      ssn: '340403198612241549',
      phone: '15060062611',
    },
  ]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    userData.map((item: any) => item.id),
  );
  const [start, isStart] = useState(false);
  const [log, setLogData] = useState<string[]>([]);
  const [drawer, setDrawer] = useState<boolean>(false);
  const [allLogs, setAllLogs] = useState<string[]>([]); // 新增一个状态变量 allLogs 来保存所有的日志内容

  useEffect(() => {
    setAllLogs((prevLogs) => [...prevLogs, ...log]); // 在变化时将 log 合并到 allLogs 中
  }, [log]);
  useEffect(() => {
    if (start) {
      const socket = io('http://127.0.0.1:8080');
      socket.connect();
      console.log('connect', socket.connect());
      socket.on('connect', () => {
        console.log('Connected to the server!');
      });
      socket.on('connect_error', (err) => {
        console.log(`connect_error due to ${err.message}`);
      });

      socket.on('connect_timeout', (timeout) => {
        console.log(`connect_timeout of ${timeout}ms exceeded`);
      });

      socket.on('log', (data) => {
        console.log(data);
        setLogData([...log, data]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [start]);
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
      isStart(true);
    } else {
      message.error(msg);
    }
  };
  return (
    <>
      <Drawer
        title={'构造日志'}
        width={'70%'}
        maskClosable={false}
        visible={drawer}
        onClose={() => {
          setDrawer(false);
          setAllLogs([]);
        }}
        placement={'right'}
      >
        <AceEditor
          mode="json"
          theme="twilight"
          // onChange={handleEditorChange}
          name="my-editor"
          value={allLogs.join('')}
          height="500px"
          width="100%"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </Drawer>
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
            // {
            //   label: "上海",
            //   value: "shanghai"
            // },
            // {
            //   label: "杭州",
            //   value: "hangzhou"
            // }
          ]}
        />

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
        <ProForm.Group>
          <ProFormText
            name="userID"
            label="用户ID"
            initialValue={'629710'}
            required={true}
            rules={[{ required: true, message: '登陆人ID必填' }]}
          />
          <ProFormText
            name="houseID"
            label="房源ID"
            required={true}
            rules={[{ required: true, message: '房源ID必填' }]}
          />
          <ProFormText name="money" label="全款成交价" initialValue={1000000} />
        </ProForm.Group>
        <EditableTable
          columns={columns}
          dataSource={userData}
          setDataSource={setUserData}
          editableKeys={editableKeys}
          setEditableRowKeys={setEditableRowKeys}
        />
      </ProForm>
    </>
  );
};

export default Index;
