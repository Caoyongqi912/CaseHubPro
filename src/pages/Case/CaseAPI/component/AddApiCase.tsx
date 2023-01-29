import React, { useState } from 'react';
import { Badge, Button, Drawer, Form, Select } from 'antd';
import ApiCaseEditor from '@/pages/Case/CaseAPI/component/ApiCaseEditor';
import { CONFIG } from '@/utils/config';
import { API } from '@/api';

const { Option } = Select;

const AddApiCase = () => {
  const [addCaseVisible, setAddCaseVisible] = useState(false);
  const [body, setBody] = useState('');
  const [bodyType, setBodyType] = useState(0);
  const [headers, setHeaders] = useState([]);
  const [formData, setFormData] = useState([]);
  const [suffix, setSuffix] = useState(false);

  const caseDetail: API.ICaseDetail[] = [
    {
      name: 'name',
      label: '用例名称',
      required: true,
      message: '请输入用例名称',
      type: 'input',
      placeholder: '请输入用例名称',
      component: null,
      span: 8,
    },
    {
      name: 'priority',
      label: '优先级',
      required: true,
      component: (
        <Select placeholder="请选择用例优先级">
          {CONFIG.PRIORITY.map((v) => (
            <Option key={v} value={v}>
              {v}
            </Option>
          ))}
        </Select>
      ),
      type: 'select',
      span: 8,
    },
    {
      name: 'status',
      label: '用例状态',
      required: true,
      component: (
        <Select placeholder="请选择用例当前状态">
          {Object.keys(CONFIG.CASE_STATUS).map((key) => (
            <Option key={key} value={key}>
              {<Badge {...CONFIG.CASE_BADGE[key]} />}
            </Option>
          ))}
        </Select>
      ),
      type: 'select',
      span: 8,
    },
    {
      name: 'request_type',
      label: '请求类型',
      required: true,
      component: (
        <Select placeholder="请选择请求协议类型">
          {Object.keys(CONFIG.REQUEST_TYPE).map((key) => (
            <Option key={key} value={key} disabled={key !== '1'}>
              {CONFIG.REQUEST_TYPE[key]}
            </Option>
          ))}
        </Select>
      ),
      type: 'select',
      span: 8,
    },
    {
      name: 'tag',
      label: '用例标签',
      required: false,
      component: <Select mode="tags" placeholder="请输入用例标签"></Select>,
      type: 'select',
      span: 8,
    },
    {
      name: 'case_type',
      label: '用例类型',
      required: true,
      component: (
        <Select placeholder="请选择用例类型">
          <Option value={0}>普通用例</Option>
          {/*<Option value={1}>前置用例</Option>*/}
          {/*<Option value={2}>数据工厂</Option>*/}
        </Select>
      ),
      type: 'select',
      span: 8,
    },
  ];
  const [form] = Form.useForm<API.ICaseDetail>();
  const showDrawer = () => {
    setAddCaseVisible(true);
  };

  const onSubmit = async () => {
    const values = await form.validateFields();
    const params = { ...values };
    console.log(params);
    console.log(bodyType);
    console.log(body);
    console.log(headers);
    console.log(formData);
  };

  return (
    <>
      <Drawer
        bodyStyle={{ padding: 0 }}
        visible={addCaseVisible}
        width={1000}
        title="添加用例"
        onClose={() => setAddCaseVisible(false)}
        maskClosable={false}
      >
        <ApiCaseEditor
          form={form}
          onSubmit={onSubmit}
          caseDetail={caseDetail}
          body={body}
          setBody={setBody}
          formData={formData}
          setFromData={setFormData}
          headers={headers}
          setHeaders={setHeaders}
          bodyType={bodyType}
          setBodyType={setBodyType}
        />
      </Drawer>
      <Button type="primary" onClick={showDrawer}>
        添加用例
      </Button>
    </>
  );
};

export default AddApiCase;
