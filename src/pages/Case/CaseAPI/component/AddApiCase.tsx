import React, { FC, useState } from 'react';
import { Button, Drawer, Form, FormInstance, message } from 'antd';
import ApiCaseEditor from '@/pages/Case/CaseAPI/component/ApiCaseEditor';
import { API } from '@/api';
import { addApiCase } from '@/api/interface';
import Result from '@/pages/Case/CaseAPI/component/Result';
import caseInfo from '@/pages/Case/CaseAPI/component/caseInfoColumns';

interface SelfProps {
  casePartID: number;
  projectID: number;
  queryCaseApis: Function;
}

const AddApiCase: FC<SelfProps> = (props) => {
  const [resultModal, setResultModal] = useState<boolean>(false);
  const [testResult, setTestResult] = useState({});
  const [addCaseVisible, setAddCaseVisible] = useState<boolean>(false);
  const [infoForm] = Form.useForm<API.IInterface>();
  const [formList, setFormList] = useState<FormInstance[]>([]);
  const [headers, setHeaders] = useState<API.IHeaders[]>([]);
  const [body, setBody] = useState<any>([]);
  const [params, setParams] = useState<API.IParams[]>([]);
  const [assertList, setAssertList] = useState<API.IAssertList[]>([]);
  const [extractList, setExtractList] = useState<API.IExtract[]>([]);

  const setFormInstance = (form: FormInstance) => {
    setFormList([...formList, form]);
  };
  const setP = (param: API.IParams) => {
    setParams([...params, param]);
  };

  const setH = (header: API.IHeaders) => {
    setHeaders([...headers, header]);
  };
  const setB = (b: any) => {
    setBody([...body, b]);
  };
  const setA = (assert: API.IAssertList) => {
    setAssertList([...assertList, assert]);
  };
  const setE = (extract: API.IExtract) => {
    setExtractList([...extractList, extract]);
  };

  /**
   * 提交新增用例
   * { title:str,level:str,status:str,http:str,desc:str
   *   steps:{step:1,name:str,desc:str,url:str,method:str,
   *          headers:{key:str,val:str,desc:str}[],
   *          params:{key:str,val:str,desc:str}[],
   *          body:{},
   *          auth:{},
   *          asserts:[ IAssertList[]]
   *          extracts:[IExtract{}]
   *        }[]
   */
  const onSubmit = async () => {
    const data = await infoForm.validateFields();
    let steps: any[] = [];
    formList.forEach((e: FormInstance, index) => {
      const info = {
        ...e.getFieldsValue(),
        params: params[index],
        headers: headers[index],
        body: body[index],
        asserts: assertList[index],
        extracts: extractList[index],
        step: index,
      };
      steps.push(info);
    });
    data.steps = steps;
    data.projectID = props.projectID;
    data.casePartID = props.casePartID;
    console.log('add', data);
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
          setFormInstance={setFormInstance}
          onSubmit={onSubmit}
          caseInfo={caseInfo}
          SH={setH}
          SA={setA}
          SB={setB}
          SE={setE}
          SP={setP}
          headers={headers}
          body={body}
          stepInfo={formList}
          setStepInfo={setFormList}
        />
      </Drawer>
      <Button type="primary" onClick={() => setAddCaseVisible(true)}>
        添加用例
      </Button>
    </>
  );
};

export default AddApiCase;
