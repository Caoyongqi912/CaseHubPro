import React, { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'umi';
import { getApiDetail, putApi, runApi } from '@/api/interface';
import { API } from '@/api';
import { Form, FormInstance, message, Spin } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ApiCaseEditor from '@/pages/Case/CaseAPI/component/ApiCaseEditor';
import caseInfo from '@/pages/Case/CaseAPI/component/caseInfoColumns';
import Result from '@/pages/Case/CaseAPI/component/Result';

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
  const stepsFormList = useRef<{ curr: number; form: FormInstance }[]>([]);
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

  const setFormInstance = (data: { curr: number; form: FormInstance }) => {
    stepsFormList.current.push(data);
  };

  const setH = (step: number, header: API.IHeaders[]) => {
    headers.current[step] = header;
  };
  const setP = (step: number, param: API.IParams[]) => {
    params.current[step] = param;
  };
  const setB = (step: number, b: any) => {
    body.current[step] = b;
  };
  const setA = (step: number, assert: API.IAssertList[]) => {
    assertList.current[step] = assert;
  };
  const setE = (step: number, extract: API.IExtract[]) => {
    extractList.current[step] = extract;
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
    stepsFormList.current.forEach((e: any, index: number) => {
      const info = {
        ...e.getFieldsValue(),
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
    data.casePartID = parseInt(casePartID);
    data.projectID = parseInt(projectID);
    data.uid = uid;
    console.log(data);
    const res = await putApi(data);
    if (res.code === 0) {
      message.success(res.msg);
    }
  };

  const run = async () => {
    const res = await runApi({ uid: uid });
    if (res.code === 0) {
      setResultModal(true);
      setResponseUid(res.data);
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
          headers={headers}
          body={body}
          SH={setH}
          SB={setB}
          SA={setA}
          SE={setE}
          SP={setP}
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
