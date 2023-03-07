import React, { FC, useRef, useState } from 'react';
import { Button, Drawer, Form, FormInstance, message } from 'antd';
import ApiCaseEditor from '@/pages/Case/CaseAPI/component/ApiCaseEditor';
import { API } from '@/api';
import caseInfo from '@/pages/Case/CaseAPI/component/caseInfoColumns';
import { addApiCase } from '@/api/interface';
import {
  setAsserts,
  setBody,
  setExtract,
  SetFormInstance,
  setHeaders,
  setParams,
} from '@/pages/Case/CaseAPI/func';

interface SelfProps {
  casePartID: number;
  projectID: number;
  queryCaseApis: Function;
}

const AddApiCase: FC<SelfProps> = (props) => {
  const [addCaseVisible, setAddCaseVisible] = useState<boolean>(false);
  const [infoForm] = Form.useForm<API.IInterface>();
  const stepsFormList = useRef<FormInstance[]>([]);
  const headers = useRef<API.IHeaders[][]>([]);
  const body = useRef<any>([]);
  const params = useRef<API.IParams[][]>([]);
  const extractList = useRef<API.IExtract[][]>([]);
  const assertList = useRef<API.IAssertList[][]>([]);

  const setFormInstance: SetFormInstance = (form: FormInstance) => {
    stepsFormList.current.push(form);
  };
  const setH: setHeaders = (step, header, del) => {
    if (del) {
      headers.current.splice(step, 1);
    } else {
      headers.current[step] = header!;
    }
  };
  const setP: setParams = (step, param, del) => {
    if (del) {
      params.current.splice(step, 1);
    } else {
      params.current[step] = param!;
    }
  };
  const setB: setBody = (step, b, del) => {
    if (del) {
      body.current.splice(step, 1);
    } else {
      body.current[step] = b!;
    }
  };
  const setA: setAsserts = (step, asserts, del) => {
    if (del) {
      assertList.current.splice(step, 1);
    } else {
      assertList.current[step] = asserts!;
    }
  };
  const setE: setExtract = (step, extract, del) => {
    if (del) {
      assertList.current.splice(step, 1);
    }
    {
      extractList.current[step] = extract!;
    }
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
    stepsFormList.current.forEach((form: FormInstance, index) => {
      const info = {
        ...form.getFieldsValue(),
        params: params.current[index],
        headers: headers.current[index],
        body: body.current[index],
        asserts: assertList.current[index],
        extracts: extractList.current[index],
        step: index,
      };
      steps.push(info);
    });
    data.steps = steps;
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
          setFormInstance={setFormInstance}
          onSubmit={onSubmit}
          caseInfo={caseInfo}
          SH={setH}
          SA={setA}
          SB={setB}
          SE={setE}
          SP={setP}
          asserts={assertList}
          extracts={extractList}
          stepInfo={stepsFormList}
        />
      </Drawer>
      <Button type="primary" onClick={() => setAddCaseVisible(true)}>
        添加用例
      </Button>
    </>
  );
};

export default AddApiCase;
