import React from 'react';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';
import styles from './index.less';
import { Alert, message } from 'antd';
import { login } from '@/api/user';
import { getToken, setToken } from '@/utils/token';

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
        const token = res.data;
        if (token && token != getToken()) {
          setToken(token);
        }
        await getCurrentUserInfo();
        console.log('==========', history);
        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        console.log('=========', redirect);
        history.push(redirect || '/');
        return;
      }
    } catch (error) {
      message.error('login fail');
    }
  };
  return (
    <div>
      <div>
        <LoginForm
          title="CaseHub Login"
          initialValues={{ autoLogin: true }}
          onFinish={async (values) => {
            await handleSubmit(values as API.ILoginParams);
          }}
        >
          <br />
          <br />
          <ProFormText
            name="username"
            initialValue="ADMIN"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder="ADMIN"
            rules={[
              {
                required: true,
                message: 'username cant empty!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            initialValue="ADMIN"
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
      </div>
    </div>
  );
};

export default Index;
