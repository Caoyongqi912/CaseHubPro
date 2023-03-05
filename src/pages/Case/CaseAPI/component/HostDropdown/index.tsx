import React, { FC, useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import { hostOpt, queryHost } from '@/api/host';

interface SelfProps {
  run: Function;
}

const Index: FC<SelfProps> = (props) => {
  const { run } = props;
  const [items, setItems] = useState<MenuProps['items']>([]);

  // const items: MenuProps["items"] = [
  //   {
  //     key: "1",
  //     label: "1"
  //   }
  // ];
  const SetItems = async () => {
    const resp = await queryHost();
    console.log(resp.data);
    let hosts: MenuProps['items'] = [];
    resp.data.map((value) => {
      console.log('---', value);
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
          console.log('====', key);
          run(key);
        },
      }}
      placement="bottomRight"
      arrow
    >
      <Button type={'primary'} style={{ marginRight: 5 }}>
        Run
      </Button>
    </Dropdown>
  );
};

export default Index;
