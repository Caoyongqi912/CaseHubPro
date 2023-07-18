import React, { useCallback } from 'react';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { history, useModel } from 'umi';
import styles from './index.less';
import { clearToken } from '@/utils/token';
import HeaderDropdown from '@/components/HeaderDropdown';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import type { MenuInfo } from 'rc-menu/lib/interface';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        clearToken();
        history.push('/login');
        return;
      } else if (key === 'center') {
        history.push('/user/center');
        return;
      }
      history.push(`/${key}`);
    },
    [setInitialState],
  );
  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }
  const { currentUser } = initialState;
  if (!currentUser || !currentUser.username) {
    return loading;
  }

  const menuItems: ItemType[] = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const menuHeaderDropdown = (
    <Menu
      className={styles.menu}
      selectedKeys={[]}
      onClick={onMenuClick}
      items={menuItems}
    />
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={currentUser.avatar}
          alt="avatar"
        >
          {currentUser.username[0]}
        </Avatar>
        <span className={`${styles.name} anticon`}>{currentUser.username}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
