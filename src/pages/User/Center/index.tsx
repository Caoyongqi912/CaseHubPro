import React, { useState } from 'react';
import { useModel } from '@@/plugin-model/useModel';
import { GridContent } from '@ant-design/pro-components';
import { Menu } from 'antd';
import styles from './style.less';
import BaseView from '@/pages/User/Center/components/base';

const { Item } = Menu;

const Index = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [initConfig, setInitConfig] = useState({
    mode: 'inline',
    selectKey: 'base',
  });
  const menuMap = {
    base: '基本设置',
    security: '安全设置',
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
        return <a>security</a>;
      default:
        return null;
    }
  };
  return (
    <GridContent>
      <div className={styles.main}>
        <div className={styles.leftMenu}>
          <Menu>{getMenu()}</Menu>
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
