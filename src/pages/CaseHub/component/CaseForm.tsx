import React, { FC, useState } from 'react';
import {
  ProForm,
  ProFormText,
  ProCard,
  ProFormSelect,
  ProFormTextArea,
  EditableProTable,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import CaseInfoStepTable from '@/pages/CaseHub/component/CaseInfoStepTable';
import { addCases } from '@/api/case';

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
  casePartID: number;
  projectID: number;
  setDrawerVisible: any;
  actionRef: any;
}

const CaseForm: FC<SelfProps> = ({
  casePartID,
  projectID,
  setDrawerVisible,
  actionRef,
}) => {
  const [form] = Form.useForm();
  const [caseInfoSource, setCaseInfoSource] = useState<DataSourceType[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    caseInfoSource.map((item: any) => item.id),
  );
  const onFinish = async () => {
    const formValue = await form.validateFields();
    if (caseInfoSource.length === 0) {
      message.error('执行步骤不能为空');
      return;
    }
    const info: any = {
      ...formValue,
      case_info: caseInfoSource.map((item, index) => ({
        ...item,
        step: index + 1,
      })),
      projectID: projectID,
      casePartID: casePartID,
    };
    console.log(info);
    await addCases(info).then(({ code, msg }) => {
      if (code === 0) {
        message.success(msg);
        setDrawerVisible(false);
        actionRef.current?.reload();
      }
    });
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
        </ProCard>
        <ProCard>
          <ProForm.Group size={'large'}>
            <ProForm.Group title={'用例等级'} size={'large'}>
              <ProFormSelect
                required={true}
                name={'case_level'}
                options={CaseLevelOptions}
                initialValue={'P1'}
              />
            </ProForm.Group>
            <ProForm.Group title={'用例类型'} size={'large'}>
              <ProFormSelect
                required={true}
                name={'case_type'}
                options={CaseTypeOptions}
                initialValue={'COMMENT'}
              />
            </ProForm.Group>
            <ProForm.Group title={'用例描述'} size={'large'}>
              <ProFormTextArea name={'case_desc'} />
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
          caseInfo={caseInfoSource}
          setCaseInfo={setCaseInfoSource}
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
