import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'umi';
import { getApiDetail } from '@/api/interface';
import { API } from '@/api';
import { Form, FormInstance, message, Spin } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ApiCaseEditor from '@/pages/Case/CaseAPI/component/ApiCaseEditor';
import caseInfo from '@/pages/Case/CaseAPI/component/caseInfoColumns';

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
  const [caseInfoFrom] = Form.useForm<API.IInterface>();
  // 步骤信息
  const [apiStepsDetail, setApiStepsDetail] = useState<API.IInterfaceStep[]>(
    [],
  );
  // 步骤基本信息
  const [stepFormList, setStepFormList] = useState<FormInstance[]>([]);

  // 步长
  const [stepsLength, setStepsLength] = useState<number>();

  // 每步请求头
  const [headers, setHeaders] = useState<API.IHeaders[]>([]);
  // 每步请求参数
  const [params, setParams] = useState<API.IParams[]>([]);
  // 每步请求体
  const [body, setBody] = useState<any>([]);
  // 每步断言
  const [assertList, setAssertList] = useState<API.IAssertList[]>([]);
  // 每步提取
  const [extractList, setExtractList] = useState<API.IExtract[]>([]);

  const setFormInstance = (form: FormInstance) => {
    console.log('setFormInstance', form.getFieldsValue());
    setStepFormList([...stepFormList, form]);
  };

  const setH = (header: API.IHeaders) => {
    setHeaders([...headers, header]);
  };
  const setP = (param: API.IParams) => {
    setParams([...params, param]);
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

  useEffect(() => {
    fetchApiDetail();
  }, []);

  const fetchApiDetail = async () => {
    const res = await getApiDetail({ uid: uid });
    if (res.code === 0) {
      caseInfoFrom.setFieldsValue(res.data);
      setApiStepsDetail(res.data.steps);
      setStepsLength(res.data!.steps.length);
      setLoad(false);
    } else {
      message.error(res.msg);
    }
  };

  const onSubmit = async () => {
    const data = await caseInfoFrom.validateFields();
    let steps: any[] = [];
    stepFormList.forEach((e: FormInstance, index) => {
      console.log(`submit ${index}`, e.getFieldsValue());
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
    data.casePartID = parseInt(casePartID);
    data.projectID = parseInt(projectID);
  };

  return (
    <PageContainer title={false}>
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
          stepInfo={stepFormList}
          stepLength={stepsLength}
          apiStepsDetail={apiStepsDetail}
          setStepInfo={setStepFormList}
        />
      </Spin>
    </PageContainer>
  );
};

export default ApiDetail;
