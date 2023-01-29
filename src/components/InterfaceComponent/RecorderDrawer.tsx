import React, { FC, useEffect, useState } from 'react';
import { Button, Col, Drawer, Form, Input, Row, Space, TreeSelect } from 'antd';
import {
  CameraOutlined,
  FireOutlined,
  ImportOutlined,
} from '@ant-design/icons';

enum ImportType {
  har = 1,
}

interface DirectoryProps {}

interface RecorderProps {
  recordLists: [];
}

interface SelfProps {
  visible: boolean;
  setVisible: Function;
  directory?: Array<DirectoryProps>;
  loading?: any;
  recorder?: RecorderProps;
  dispatch?: Function;
}

const RecorderDrawer = ({
  visible,
  setVisible,
  directory,
  loading,
  recorder,
  dispatch,
}: SelfProps) => {
  const [form] = Form.useForm();
  const [record, setRecord] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    setRecord([]);
    form.resetFields();
  }, [visible]);

  return (
    <Drawer
      title="生成用例"
      onClose={() => setVisible()}
      visible={visible}
      width={960}
      extra={
        <Button disabled={selectedRowKeys.length === 0} type="primary">
          <FireOutlined /> 生成用例
        </Button>
      }
    ></Drawer>
  );
};

export default RecorderDrawer;
