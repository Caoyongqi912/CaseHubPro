import React, { FC, useState } from 'react';
import {
  Badge,
  Button,
  Drawer,
  Form,
  FormInstance,
  message,
  Select,
} from 'antd';
import ApiCaseEditor from '@/pages/Case/CaseAPI/component/ApiCaseEditor';
import { CONFIG } from '@/utils/config';
import { API } from '@/api';
import { addApiCase } from '@/api/interface';
import Result from '@/pages/Case/CaseAPI/component/Result';

const { Option } = Select;

interface SelfProps {
  casePartID: number;
  projectID: number;
  queryCaseApis: Function;
}

const AddApiCase: FC<SelfProps> = (props) => {
  const [resultModal, setResultModal] = useState(false);
  const [testResult, setTestResult] = useState({});

  const [addCaseVisible, setAddCaseVisible] = useState(false);
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
      default: 'P1',
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
      default: 'DEBUG',

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
      default: 'HTTP',
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
  const [formList, setFormList] = useState<FormInstance[]>([]);
  const [headers, setHeaders] = useState<any>([]);
  const [body, setBody] = useState<any>([]);
  const getFormInstance = (form: FormInstance) => {
    setFormList([...formList, form]);
  };

  const setH = (h: any) => {
    console.log('set', h);
    setHeaders([...headers, h]);
  };
  const setB = (b: any) => {
    setBody([...body, b]);
  };
  /**
   * 提交新增用例
   * { title:str,level:str,status:str,http:str,desc:str
   *   steps:{step:1,name:str,desc:str,url:str,method:str,
   *          headers:{key:str,val:str,desc:str}[],
   *          params:{key:str,val:str,desc:str}[],
   *          body:{},
   *          auth:{},
   *          jsonpath:{jp:str,expect:str,option:str}[]
   *        }[]
   */
  const onSubmit = async () => {
    const data = await infoForm.validateFields();
    let steps: any[] = [];
    formList.forEach((e: FormInstance, index) => {
      const info = {
        ...e.getFieldsValue(),
        headers: headers[index],
        body: body[index],
        step: index,
      };
      steps.push(info);
    });
    data.steps = steps;
    console.log(data);
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
        <Result
          response={testResult}
          name={'test'}
          modal={resultModal}
          setModal={setResultModal}
          single={false}
        />

        <ApiCaseEditor
          form={infoForm}
          getFormInstance={getFormInstance}
          onSubmit={onSubmit}
          caseInfo={caseInfo}
          SH={setH}
          headers={headers}
          body={body}
          stepInfo={formList}
          setStepInfo={setFormList}
          SB={setB}
        />
      </Drawer>
      <Button type="primary" onClick={() => setAddCaseVisible(true)}>
        添加用例
      </Button>
    </>
  );
};

export default AddApiCase;
