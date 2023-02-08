import { Empty } from 'antd';

interface SelfProps {
  desc?: any;
  height: number;
  image?: any;
}

import React, { FC } from 'react';

const NoRecord: FC<SelfProps> = ({
  desc,
  height = 180,
  image = require('@/assets/no_record.svg'),
}) => {
  return (
    <Empty
      image={image}
      imageStyle={{
        height,
      }}
      description={desc || '暂无数据'}
    />
  );
};

export default NoRecord;
