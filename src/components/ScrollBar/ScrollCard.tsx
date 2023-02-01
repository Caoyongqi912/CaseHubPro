import React, { FC } from 'react';
import { Card } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

interface SelfProps {
  bodyPadding: number;
  hideOverflowX: boolean;
  children: any;
}

const ScrollCard: FC<SelfProps> = (props) => {
  return (
    <Card
      {...props}
      bodyStyle={{
        padding: props.bodyPadding || 24,
        height: '100%',
        overflowX: 'hidden',
      }}
    >
      {props.hideOverflowX ? (
        <Scrollbars>{props.children}</Scrollbars>
      ) : (
        <Scrollbars>{props.children}</Scrollbars>
      )}
    </Card>
  );
};

export default ScrollCard;
