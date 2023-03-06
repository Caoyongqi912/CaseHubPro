import React, { FC, useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { queryHost } from '@/api/host';

interface SelfProps {
  run: Function;
  buttonName: string;
}

const Index: FC<SelfProps> = (props) => {
  const { run } = props;
  const [items, setItems] = useState<MenuProps['items']>([]);

  const SetItems = async () => {
    const resp = await queryHost();
    let hosts: MenuProps['items'] = [];
    resp.data.map((value) => {
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
          run(key);
        },
      }}
      placement="bottomRight"
      arrow
    >
      <Button type={'primary'} style={{ marginRight: 5 }}>
        {props.buttonName}
      </Button>
    </Dropdown>
  );
};

export default Index;
