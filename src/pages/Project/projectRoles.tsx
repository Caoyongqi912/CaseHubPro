import React, { FC, useEffect, useRef, useState } from 'react';
import { Avatar, Button, List, message } from 'antd';
import {
  addUser2Project,
  delUserFromProjectFetch,
  queryProjectUsers,
} from '@/api/project';
import { API } from '@/api';
import { ModalForm, ProFormSelect } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import MohuSearch from '@/components/UserOpt/MohuSearch';

interface ISelfProps {
  projectUID: string;
}

interface Items {
  uid: string;
  title: string;
  avatar?: string;
  description?: string;
}

const ProjectRoles: FC<ISelfProps> = (props) => {
  const { projectUID } = props;
  const [users, setUsers] = useState<Items[]>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const queryUsers = async () => {
    const { code, data, msg } = await queryProjectUsers({ uid: projectUID });
    if (code === 0) {
      let us: Items[] = [];
      data.forEach((items: API.IUser) => {
        us.push({
          uid: items.uid!,
          title: items.username + ' / ' + items.email,
          avatar: items.avatar,
          description: items.departmentName + '/' + items.tagName,
        });
      });
      setUsers(us);
      return;
    }
    return message.error(msg);
  };

  useEffect(() => {
    queryUsers();
  }, [userCount]);

  const delUserFromProject = async (uid: string) => {
    const { code, msg } = await delUserFromProjectFetch({
      uid: uid,
      projectID: projectUID,
    });
    if (code === 0) {
      setUserCount(userCount + 1);
      message.success(msg);
      return;
    }
  };
  const onFinish = async (values: { userIds: number[] }) => {
    let form = {
      uid: projectUID,
      ...values,
    };
    await addUser2Project(form);
    setUserCount(userCount - 1);
    return true;
  };
  return (
    <>
      <ModalForm<{
        userIds: Array<number>;
      }>
        trigger={
          <Button type="primary">
            <PlusOutlined />
            添加用户
          </Button>
        }
        onFinish={async (values) => onFinish(values)}
      >
        <ProFormSelect
          showSearch
          name="userIds"
          label="添加成员"
          placeholder="input  name to search"
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
      <List
        style={{ marginTop: 10 }}
        itemLayout="horizontal"
        size="large"
        dataSource={users}
        renderItem={(item: Items) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  alt={item.avatar}
                  src={item.avatar}
                  style={{ background: '#f56a00' }}
                >
                  {item.title[0]}
                </Avatar>
              }
              title={item.title}
              description={item.description}
            />
            <Button
              type="primary"
              onClick={async () => delUserFromProject(item.uid)}
            >
              移除
            </Button>
          </List.Item>
        )}
      ></List>
    </>
  );
};

export default ProjectRoles;
