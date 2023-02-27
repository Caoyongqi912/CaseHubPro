import React, { FC, useRef, useState } from 'react';
import { Button, Drawer, Form, FormInstance, message } from 'antd';
import ApiCaseEditor from '@/pages/Case/CaseAPI/component/ApiCaseEditor';
import { API } from '@/api';
import caseInfo from '@/pages/Case/CaseAPI/component/caseInfoColumns';
import { addApiCase } from '@/api/interface';

interface SelfProps {
  casePartID: number;
  projectID: number;
  queryCaseApis: Function;
}

const AddApiCase: FC<SelfProps> = (props) => {
  const [addCaseVisible, setAddCaseVisible] = useState<boolean>(false);
  const [infoForm] = Form.useForm<API.IInterface>();
  const stepsFormList = useRef<{ curr: number; form: FormInstance }[]>([]);
  const headers = useRef<API.IHeaders[][]>([]);
  const body = useRef<any>([]);
  const params = useRef<API.IParams[][]>([]);
  const [assertList, setAssertList] = useState<API.IAssertList[]>([]);
  const [extractList, setExtractList] = useState<API.IExtract[]>([]);

  const setFormInstance = (data: { curr: number; form: FormInstance }) => {
    stepsFormList.current.push(data);
  };

  const setP = (step: number, param: API.IParams[]) => {
    params.current[step] = param;
  };

  const setH = (step: number, header: API.IHeaders[]) => {
    headers.current[step] = header;
  };
  const setB = (step: number, b: any) => {
    body.current[step] = b;
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
    stepsFormList.current.forEach((e: any, index) => {
      const info = {
        ...e.getFieldsValue(),
        params: params.current[index],
        headers: headers.current[index],
        body: body.current[index],
        asserts: assertList[index],
        extracts: extractList[index],
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
        {/*<Result*/}
        {/*  response={testResult}*/}
        {/*  name={'test'}*/}
        {/*  modal={resultModal}*/}
        {/*  setModal={setResultModal}*/}
        {/*  single={false}*/}
        {/*/>*/}

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
