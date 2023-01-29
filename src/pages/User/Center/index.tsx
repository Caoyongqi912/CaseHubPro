import React, { useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { GridContent } from '@ant-design/pro-components';
import { Menu } from 'antd';
import styles from './style.less';
import BaseView from '@/pages/User/Center/components/base';
import SetPwd from '@/pages/User/Center/components/setPwd';

const { Item } = Menu;

const Index = () => {
  const [initConfig, setInitConfig] = useState({
    mode: 'inline',
    selectKey: 'base',
  });
  const menuMap = {
    base: '基本信息',
    security: '更新密码',
  };
  const getMenu = () => {
    return Object.keys(menuMap).map((item) => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  };

  const renderChildren = () => {
    const { selectKey } = initConfig;
    switch (selectKey) {
      case 'base':
        return <BaseView />;
      case 'security':
        return <SetPwd />;
      default:
        return null;
    }
  };
  return (
    <GridContent>
      <div className={styles.main}>
        <div className={styles.leftMenu}>
          <Menu
            mode={initConfig.mode}
            selectedKeys={[initConfig.selectKey]}
            onClick={({ key }) => {
              setInitConfig({ ...initConfig, selectKey: key });
            }}
          >
            {getMenu()}
          </Menu>
        </div>
        <div className={styles.right}>
          <div className={styles.title}>{menuMap[initConfig.selectKey]}</div>
          {renderChildren()}
        </div>
      </div>
    </GridContent>
  );
};

export default Index;
