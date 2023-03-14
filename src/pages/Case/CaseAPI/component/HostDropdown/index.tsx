import React, { FC, useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { queryHost } from '@/api/host';

interface SelfProps {
  run: Function;
  buttonName: string;
  a?: boolean;
  uid?: string;
}

const Index: FC<SelfProps> = (props) => {
  const { run, a } = props;
  const [items, setItems] = useState<MenuProps['items']>([]);

  const SetItems = async () => {
    const resp = await queryHost();
    let hosts: MenuProps['items'] = [];
    resp.data.map((value: any) => {
      let _ = {
        key: value.uid,
        label: value.name,
      };
      hosts?.push(_);
    });
    setItems(hosts);
  };

  useEffect(() => {
    SetItems();
  }, []);
  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ key }) => {
          console.log('==', key);
          run(props.uid, key);
        },
      }}
      placement="bottomRight"
      arrow
    >
      {!a ? (
        <Button type={'primary'} style={{ marginRight: 5 }}>
          {props.buttonName}
        </Button>
      ) : (
        <a>{props.buttonName}</a>
      )}
    </Dropdown>
  );
};

export default Index;
