import React from 'react';
import { ModalForm, ProFormSelect } from '@ant-design/pro-components';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MohuSearch from '@/components/UserOpt/MohuSearch';
import { addUser2Project } from '@/api/project';

interface selfProps {
  UID: string;
}

const ProjectAddUser: React.FC<selfProps> = (props) => {
  let { UID } = props;
  return (
    <ModalForm<{
      userIds: Array<number>;
    }>
      trigger={
        <Button type="primary">
          <PlusOutlined />
          添加用户
        </Button>
      }
      onFinish={async (values) => {
        let form = {
          uid: UID,
          ...values,
        };
        await addUser2Project(form);
        return true;
      }}
    >
      <ProFormSelect
        showSearch
        name="userIds"
        label="添加成员"
        placeholder="input your name to search"
        required={true}
        rules={[{ required: true, message: 'Please select !' }]}
        debounceTime={1000}
        colProps={{ span: 8 }}
        fieldProps={{
          mode: 'multiple',
          autoClearSearchValue: true,
          onChange: (value) => value,
        }}
        request={async (values) => {
          return await MohuSearch(values);
        }}
      />
    </ModalForm>
  );
};

export default ProjectAddUser;
