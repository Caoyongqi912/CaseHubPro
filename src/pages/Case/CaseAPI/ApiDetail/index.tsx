import React, { FC, useEffect, useRef, useState } from 'react';
import { useParams as umiUseParams } from 'umi';
import { getApiDetail, putApi, runApi } from '@/api/interface';
import { API } from '@/api';
import { Form, FormInstance, message, Spin } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ApiCaseEditor from '@/pages/Case/CaseAPI/component/ApiCaseEditor';
import caseInfo from '@/pages/Case/CaseAPI/component/caseInfoColumns';
import Result from '@/pages/Case/CaseAPI/component/Result/Result';
import { SetFormInstance } from '@/pages/Case/CaseAPI/MyHook/func';
import useHeaders from '@/pages/Case/CaseAPI/MyHook/useHeaders';
import useBody from '@/pages/Case/CaseAPI/MyHook/useBody';
import useExtract from '@/pages/Case/CaseAPI/MyHook/useExtract';
import useAssert from '@/pages/Case/CaseAPI/MyHook/useAssert';
import useParams from '@/pages/Case/CaseAPI/MyHook/useParams';

interface DetailParams {
  uid: string;
  projectID: string;
  casePartID: string;
}

const Index: FC = () => {
  const Api = umiUseParams<DetailParams>();
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
  const [resultModal, setResultModal] = useState(false);
  const [responseUid, setResponseUid] = useState<string>();
  const [HeadersRef, SetHeaders] = useHeaders();
  const [ParamsRef, SetParams] = useParams();
  const [BodyRef, SetBody] = useBody();
  const [ExtractsRef, SetExtracts] = useExtract();
  const [AssertsRef, SetAsserts] = useAssert();

  const setFormInstance: SetFormInstance = (form: FormInstance) => {
    stepsFormList.current.push(form);
  };

  useEffect(() => {
    fetchApiDetail().then();
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
        params: ParamsRef.current[index],
        headers: HeadersRef.current[index],
        body: BodyRef.current[index],
        asserts:
          AssertsRef.current[index] || apiStepsDetail[index]?.asserts || [],
        extracts:
          ExtractsRef.current[index] || apiStepsDetail[index]?.extracts || [],
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

  const run = async () => {
    setResultModal(true);
    const { code, data } = await runApi({ uid: uid });
    if (code === 0) {
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
          SetHeaders={SetHeaders}
          SetAsserts={SetAsserts}
          SetBody={SetBody}
          SetExtracts={SetExtracts}
          SetParams={SetParams}
          AssertsRef={AssertsRef}
          ExtractsRef={ExtractsRef}
          stepInfo={stepsFormList}
          apiStepsDetail={apiStepsDetail}
          isDetail={true}
          run={run}
        />
      </Spin>
    </PageContainer>
  );
};

export default Index;
