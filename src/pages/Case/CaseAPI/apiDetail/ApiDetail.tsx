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
}

const ApiDetail: FC = () => {
  const ApiID = useParams<DetailParams>();
  const [caseInfoFrom] = Form.useForm<API.IInterface>();
  const [apiDetail, setApiDetail] = useState<API.IInterfaceStep[]>([]);
  const [stepsLength, setStepsLength] = useState(1);
  const [load, setLoad] = useState<boolean>(true);
  const [formList, setFormList] = useState<FormInstance[]>([]);
  const [headers, setHeaders] = useState<API.IHeaders[]>([]);
  const [params, setParams] = useState<API.IParams[]>([]);
  const [body, setBody] = useState<any>([]);
  const [assertList, setAssertList] = useState<API.IAssertList[]>([]);
  const [extractList, setExtractList] = useState<API.IExtract[]>([]);

  const getFormInstance = (form: FormInstance) => {
    setFormList([...formList, form]);
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
  const fetchApiDetail = async () => {
    const res = await getApiDetail(ApiID);
    if (res.code === 0) {
      initCaseDetail(res.data!.steps);
      initCaseInfo(res.data!);
      setStepsLength(res.data!.steps.length);
      setLoad(false);
    } else {
      message.error(res.msg);
    }
  };
  const initCaseDetail = (info: API.IInterfaceStep[]) => {
    setApiDetail(info);
  };

  const initCaseInfo = (info: API.IInterface) => {
    caseInfoFrom.setFieldsValue(info);
  };

  const onSubmit = () => {};

  useEffect(() => {
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
          SP={setP}
          stepInfo={formList}
          stepLength={stepsLength}
          apiDetail={apiDetail}
          setStepInfo={setFormList}
        />
      </Spin>
    </PageContainer>
  );
};

export default ApiDetail;
