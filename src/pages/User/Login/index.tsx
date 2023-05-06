import React from 'react';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';
import styles from './index.less';
import { message } from 'antd';
import { login } from '@/api/user';
import { getToken, setToken } from '@/utils/token';
import { API } from '@/api';

const Index: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const getCurrentUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.ILoginParams) => {
    try {
      const res = await login({ ...values });
      if (res.code === 0) {
        message.success('login success');
        const { token } = res.data;
        if (token && token != getToken()) {
          setToken(token);
        }
        await getCurrentUserInfo();
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }
    } catch (error) {
      console.log(error);
      message.error('login fail');
    }
  };
  return (
    <LoginForm
      title="CaseHUB"
      initialValues={{ autoLogin: true }}
      onFinish={async (values) => {
        await handleSubmit(values as API.ILoginParams);
      }}
      style={{ marginTop: 100 }}
    >
      <ProFormText
        name="username"
        initialValue="admin"
        fieldProps={{
          size: 'large',
          prefix: <UserOutlined className={styles.prefixIcon} />,
        }}
        placeholder="admin"
        rules={[
          {
            required: true,
            message: 'username cant empty!',
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        initialValue="admin"
        fieldProps={{
          size: 'large',
          prefix: <LockOutlined className={styles.prefixIcon} />,
        }}
        rules={[
          {
            required: true,
            message: 'username cant empty!',
          },
        ]}
      />
    </LoginForm>
  );
};

export default Index;
