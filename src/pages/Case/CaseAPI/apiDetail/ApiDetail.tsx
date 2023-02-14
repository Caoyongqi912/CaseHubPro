import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'umi';
import { getApiDetail } from '@/api/interface';
import { API, IInterfaceStep } from '@/api';
import { Card, Col, Form, FormInstance, message, Row, Spin } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ApiCaseEditor from '@/pages/Case/CaseAPI/component/ApiCaseEditor';
import caseInfo from '@/pages/Case/CaseAPI/component/caseInfoColumns';

interface DetailParams {
  uid: string;
}

const ApiDetail: FC = (props, context) => {
  const ApiID = useParams<DetailParams>();
  const UID = ApiID.uid;
  const [apiDetail, setApiDetail] = useState<API.IInterfaceDetail>();
  const [stepsLength, setStepsLength] = useState(1);
  const [load, setLoad] = useState<boolean>(true);
  const [caseInfoFrom] = Form.useForm<API.IInterface>();
  const [formList, setFormList] = useState<FormInstance[]>([]);
  const [headers, setHeaders] = useState<API.IHeaders[]>([]);
  const [body, setBody] = useState<any>([]);
  const [assertList, setAssertList] = useState<API.IAssertList[]>([]);
  const [extractList, setExtractList] = useState<API.IExtract[]>([]);

  const getFormInstance = (form: FormInstance) => {
    setFormList([...formList, form]);
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
  const fetchApiDetail = async () => {
    const res = await getApiDetail(ApiID);
    if (res.code === 0) {
      setApiDetail(res.data!);
      initCaseInfo(res.data!);
      initCaseStepsInfo(res.data!.steps);
      setStepsLength(res.data!.steps.length);
      setLoad(false);
    } else {
      message.error(res.msg);
    }
  };

  const initCaseInfo = (info: API.IInterface) => {
    caseInfoFrom.setFieldsValue(info);
  };
  const initCaseStepsInfo = (steps: API.IInterfaceStep[]) => {
    console.log(steps);
    formList.forEach((value) => {
      value.setFieldsValue(steps);
    });
  };
  const onSubmit = () => {};
  useEffect(() => {
    console.log(UID);
    fetchApiDetail();
  }, []);

  return (
    <PageContainer title={false}>
      <Spin tip={'努力加载中。。'} size={'large'} spinning={load}>
        <ApiCaseEditor
          onSubmit={onSubmit}
          form={caseInfoFrom}
          caseInfo={caseInfo}
          getFormInstance={getFormInstance}
          headers={headers}
          body={body}
          SH={setH}
          SB={setB}
          SA={setA}
          SE={setE}
          stepInfo={formList}
          setStepInfo={setFormList}
        />
      </Spin>
    </PageContainer>
  );
};

export default ApiDetail;
