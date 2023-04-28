import React, { FC, useEffect, useState } from 'react';
import {
  ProForm,
  ProFormText,
  ProCard,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import CaseInfoStepTable from '@/pages/CaseHub/component/CaseInfoStepTable';
import { addCases, putCase } from '@/api/case';
import { API } from '@/api';
import * as buffer from 'buffer';

type CaseFormType = {};
type DataSourceType = {
  id: React.Key;
  step: number;
  todo: string;
  exp: string;
};
const CaseLevelOptions = [
  { label: 'P1', value: 'P1' },
  { label: 'P2', value: 'P2' },
  {
    label: 'P3',
    value: 'P3',
  },
  { label: 'P4', value: 'P4' },
];
const CaseTypeOptions = [
  { label: '普通用例', value: 'COMMENT' },
  { label: '冒烟用例', value: 'SMOKE' },
];

interface SelfProps {
  casePartID?: number;
  projectID?: number;
  setDrawerVisible?: any;
  actionRef?: any;
  caseInfo?: API.ICaseInfo;
  update?: boolean;
}

const CaseForm: FC<SelfProps> = ({
  casePartID,
  projectID,
  setDrawerVisible,
  actionRef,
  caseInfo,
  update = false,
}) => {
  const [form] = Form.useForm();
  const [caseStepSource, setCaseStepInfoSource] = useState<API.ICaseStepInfo[]>(
    [],
  );
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    caseStepSource.map((item: any) => item.id),
  );
  useEffect(() => {
    if (caseInfo) {
      form.setFieldsValue(caseInfo);
      const newCaseInfo = caseInfo.case_info.map((caseStepInfo) => ({
        ...caseStepInfo,
        step: undefined,
      }));
      setCaseStepInfoSource(newCaseInfo);
    }
  }, [caseInfo]);

  const onFinish = async () => {
    const formValue = await form.validateFields();
    if (caseStepSource.length === 0) {
      message.error('执行步骤不能为空');
      return;
    }
    const info: API.ICaseInfo = {
      ...formValue,
      case_info: caseStepSource.map((item, index) => ({
        ...item,
        step: index + 1,
      })),
      projectID: projectID,
      casePartID: casePartID,
    };
    if (update) {
      info.id = caseInfo!.id;
      info.uid = caseInfo!.uid;
      console.log(info);
      await putCase(info).then(({ code, msg }) => {
        if (code === 0) {
          message.success(msg);
          setDrawerVisible(false);
          actionRef.current?.reload();
        }
      });
    } else {
      await addCases(info).then(({ code, msg }) => {
        if (code === 0) {
          message.success(msg);
          setDrawerVisible(false);
          actionRef.current?.reload();
        }
      });
    }
  };

  return (
    <ProCard>
      <ProForm<CaseFormType> form={form} onFinish={onFinish}>
        <ProCard style={{ marginBottom: 8 }}>
          <ProFormText
            name={'case_title'}
            label={'用例标题'}
            placeholder={'请输入用例标题'}
            required={true}
            tooltip={'最长20位'}
            rules={[{ required: true, message: '标题不能为空' }]}
          />
          <ProFormTextArea
            name={'case_desc'}
            label={'用例描述'}
            placeholder={'请输入用例描述'}
            required={true}
            rules={[{ required: true, message: '描述不能为空' }]}
          />
        </ProCard>
        <ProCard>
          <ProForm.Group size={'large'}>
            <ProForm.Group title={'用例等级'} size={'large'}>
              <ProFormSelect
                required={true}
                width={'lg'}
                name={'case_level'}
                options={CaseLevelOptions}
                initialValue={'P1'}
              />
            </ProForm.Group>
            <ProForm.Group title={'用例类型'} size={'large'}>
              <ProFormSelect
                required={true}
                width={'lg'}
                name={'case_type'}
                options={CaseTypeOptions}
                initialValue={'COMMENT'}
              />
            </ProForm.Group>
          </ProForm.Group>
        </ProCard>
        <ProCard>
          <ProFormTextArea
            style={{ width: '100%' }}
            name={'case_setup'}
            label={'用例前置'}
            required={true}
            rules={[{ required: true, message: '前置不能为空' }]}
          />
        </ProCard>
        <CaseInfoStepTable
          caseStepInfo={caseStepSource}
          setStepCaseInfo={setCaseStepInfoSource}
          editableKeys={editableKeys}
          setEditableRowKeys={setEditableRowKeys}
        />
        <ProCard>
          <ProFormTextArea
            style={{ width: '100%' }}
            name={'case_mark'}
            label={'用例备注'}
            required={false}
          />
        </ProCard>
      </ProForm>
    </ProCard>
  );
};

export default CaseForm;
