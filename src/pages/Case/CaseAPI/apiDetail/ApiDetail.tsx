import React, { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'umi';
import { getApiDetail, putApi, runApi } from '@/api/interface';
import { API } from '@/api';
import { Form, FormInstance, message, Spin } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ApiCaseEditor from '@/pages/Case/CaseAPI/component/ApiCaseEditor';
import caseInfo from '@/pages/Case/CaseAPI/component/caseInfoColumns';
import Result from '@/pages/Case/CaseAPI/component/Result/Result';
import {
  setAsserts,
  setBody,
  setExtract,
  SetFormInstance,
  setHeaders,
  setParams,
} from '@/pages/Case/CaseAPI/func';

interface DetailParams {
  uid: string;
  projectID: string;
  casePartID: string;
}

const ApiDetail: FC = () => {
  const Api = useParams<DetailParams>();
  const { uid, projectID, casePartID } = Api;
  const [load, setLoad] = useState<boolean>(true);
  // 基本信息
  const [caseInfoFrom] = Form.useForm<API.IInterfaceDetail>();
  // 步骤信息
  const [apiStepsDetail, setApiStepsDetail] = useState<API.IInterfaceStep[]>(
    [],
  );
  // 步骤基本信息
  const stepsFormList = useRef<FormInstance[]>([]);
  // 每步请求头
  const headers = useRef<API.IHeaders[][]>([]);

  // 每步请求参数
  const params = useRef<API.IParams[][]>([]);
  // 每步请求体
  const body = useRef<any>([]);
  // 每步断言
  const assertList = useRef<API.IAssertList[][]>([]);
  // 每步提取
  const extractList = useRef<API.IExtract[][]>([]);
  const [resultModal, setResultModal] = useState(false);
  const [responseUid, setResponseUid] = useState<string>();

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
      extractList.current.splice(step, 1);
    } else {
      extractList.current[step] = extract!;
    }
  };
  useEffect(() => {
    fetchApiDetail();
  }, []);

  const fetchApiDetail = async () => {
    const res = await getApiDetail({ uid: uid });
    if (res.code === 0) {
      caseInfoFrom.setFieldsValue(res.data);
      setApiStepsDetail(res.data.steps);
      setLoad(false);
    } else {
      message.error(res.msg);
    }
  };

  const onSubmit = async () => {
    const data = await caseInfoFrom.validateFields();
    let steps: any[] = [];
    stepsFormList.current.forEach((form: FormInstance, index: number) => {
      const info = {
        ...form.getFieldsValue(),
        params: params.current[index],
        headers: headers.current[index],
        body: body.current[index],
        asserts: assertList.current[index] || apiStepsDetail[index].asserts,
        extracts: extractList.current[index] || apiStepsDetail[index].extracts,
        step: index,
      };
      steps.push(info);
    });
    console.log(steps);
    data.steps = steps;
    data.casePartID = parseInt(casePartID);
    data.projectID = parseInt(projectID);
    data.uid = uid;
    console.log(data);
    const res = await putApi(data);
    if (res.code === 0) {
      message.success(res.msg);
    }
  };

  const run = async (u?: string, HostID?: string) => {
    const { code, data } = await runApi({ uid: u || uid, HostID: HostID });
    if (code === 0) {
      setResultModal(true);
      setResponseUid(data);
    }
  };

  return (
    <PageContainer title={false}>
      <Result
        uid={responseUid}
        modal={resultModal}
        setModal={setResultModal}
        single={false}
      />
      <Spin tip={'努力加载中。。'} size={'large'} spinning={load}>
        <ApiCaseEditor
          onSubmit={onSubmit}
          form={caseInfoFrom}
          caseInfo={caseInfo}
          setFormInstance={setFormInstance}
          SH={setH}
          SB={setB}
          SA={setA}
          SE={setE}
          SP={setP}
          asserts={assertList}
          extracts={extractList}
          stepInfo={stepsFormList}
          apiStepsDetail={apiStepsDetail}
          isDetail={true}
          run={run}
        />
      </Spin>
    </PageContainer>
  );
};

export default ApiDetail;
