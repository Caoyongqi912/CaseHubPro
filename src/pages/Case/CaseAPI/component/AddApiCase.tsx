import React, { FC, useRef, useState } from 'react';
import { Button, Drawer, Form, FormInstance, message } from 'antd';
import ApiCaseEditor from '@/pages/Case/CaseAPI/component/ApiCaseEditor';
import { API } from '@/api';
import caseInfo from '@/pages/Case/CaseAPI/component/caseInfoColumns';
import { addApiCase } from '@/api/interface';
import { SetFormInstance } from '@/pages/Case/CaseAPI/MyHook/func';
import useHeaders from '@/pages/Case/CaseAPI/MyHook/useHeaders';
import useParams from '@/pages/Case/CaseAPI/MyHook/useParams';
import useBody from '@/pages/Case/CaseAPI/MyHook/useBody';
import useExtract from '@/pages/Case/CaseAPI/MyHook/useExtract';
import useAssert from '@/pages/Case/CaseAPI/MyHook/useAssert';

interface SelfProps {
  casePartID: number;
  projectID: number;
  actionRef: any;
}

const AddApiCase: FC<SelfProps> = (props) => {
  const [addCaseVisible, setAddCaseVisible] = useState<boolean>(false);
  const [infoForm] = Form.useForm<API.IInterface>();
  const stepsFormList = useRef<FormInstance[]>([]);
  const [HeadersRef, SetHeaders] = useHeaders();
  const [ParamsRef, SetParams] = useParams();
  const [BodyRef, SetBody] = useBody();
  const [ExtractsRef, SetExtracts] = useExtract();
  const [AssertsRef, SetAsserts] = useAssert();

  const setFormInstance: SetFormInstance = (form: FormInstance) => {
    stepsFormList.current.push(form);
  };

  /**
   * 提交新增用例
   */
  const onSubmit = async () => {
    const data = await infoForm.validateFields();
    let steps: any[] = [];
    stepsFormList.current.forEach((form: FormInstance, index) => {
      const info = {
        ...form.getFieldsValue(),
        params: ParamsRef.current[index],
        headers: HeadersRef.current[index],
        body: BodyRef.current[index],
        asserts: AssertsRef.current[index],
        extracts: ExtractsRef.current[index],
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
      props.actionRef.current?.reload();
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
          SetHeaders={SetHeaders}
          SetAsserts={SetAsserts}
          SetBody={SetBody}
          SetExtracts={SetExtracts}
          SetParams={SetParams}
          AssertsRef={AssertsRef}
          ExtractsRef={ExtractsRef}
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
