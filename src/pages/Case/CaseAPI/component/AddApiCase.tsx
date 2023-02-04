import React, { FC, useState } from 'react';
import { Badge, Button, Drawer, Form, message, Select } from 'antd';
import ApiCaseEditor from '@/pages/Case/CaseAPI/component/ApiCaseEditor';
import { CONFIG } from '@/utils/config';
import { API } from '@/api';
import { addApiCase } from '@/api/interface';

const { Option } = Select;

interface SelfProps {
  casePartID: number;
  projectID: number;
  queryCaseApis: Function;
}

const AddApiCase: FC<SelfProps> = (props) => {
  const [addCaseVisible, setAddCaseVisible] = useState(false);
  const [body, setBody] = useState('');
  const [bodyType, setBodyType] = useState(0);
  const [headers, setHeaders] = useState([]);
  const [formData, setFormData] = useState([]);

  const caseInfo: API.IAPICaseInfo[] = [
    {
      name: 'title',
      label: '用例名称',
      required: true,
      message: '请输入用例名称',
      type: 'input',
      placeholder: '请输入用例名称',
      component: null,
      span: 8,
    },
    {
      name: 'level',
      label: '优先级',
      required: true,
      component: (
        <Select placeholder="请选择用例优先级">
          {CONFIG.CASE_LEVEL.map((v) => (
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
          {Object.keys(CONFIG.CASESTATUS).map((key, value) => (
            <Option key={key} value={key}>
              {/*// @ts-ignore*/}
              {CONFIG.CASESTATUS[key]}
            </Option>
          ))}
        </Select>
      ),
      type: 'select',
      span: 8,
    },
    {
      name: 'http',
      label: '请求类型',
      required: true,
      component: (
        <Select placeholder="请选择请求协议类型">
          {Object.keys(CONFIG.REQUEST_TYPE).map((key) => (
            <Option key={key} value={key} disabled={key !== '1'}>
              {/*// @ts-ignore*/}
              {CONFIG.REQUEST_TYPE[key]}
            </Option>
          ))}
        </Select>
      ),
      type: 'select',
      span: 8,
    },
    {
      name: 'desc',
      label: '描述',
      required: false,
      component: null,
      type: 'textarea',
      span: 8,
    },
  ];
  const [infoForm] = Form.useForm<API.IInterface>();
  const [stepsForm] = Form.useForm<API.IInterfaceStep>();

  /**
   * 提交新增用例
   */
  const onSubmit = async () => {
    const data = await infoForm.validateFields();
    const step = await stepsForm.validateFields();
    step.body = body;
    step.headers = headers;
    data.steps = [{ ...step }];
    data.projectID = props.projectID;
    data.casePartID = props.casePartID;
    const res = await addApiCase(data);
    if (res.code === 0) {
      message.success(res.msg);
      setAddCaseVisible(false);
      await props.queryCaseApis();
    }
  };

  return (
    <>
      <Drawer
        bodyStyle={{ padding: 0 }}
        visible={addCaseVisible}
        width={'65%'}
        title="添加用例"
        onClose={() => setAddCaseVisible(false)}
        maskClosable={false}
      >
        <ApiCaseEditor
          form={infoForm}
          stepsForm={stepsForm}
          onSubmit={onSubmit}
          caseInfo={caseInfo}
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
      <Button type="primary" onClick={() => setAddCaseVisible(true)}>
        添加用例
      </Button>
    </>
  );
};

export default AddApiCase;
