import React, { FC } from 'react';
import { IconFont } from '@/utils/IconFont';

interface SelfProps {
  icon?: any;
  text?: string;
  font?: number;
  style?: any;
  onClick?: any;
  back?: true;
}

const TextIcon: FC<SelfProps> = (props) => {
  const { icon, text, font = 13, style, onClick, back } = props;
  return back ? (
    <span onClick={onClick} style={{ ...style }}>
      <IconFont type={icon} style={{ fontSize: font }} /> {text}
    </span>
  ) : (
    <span onClick={onClick} style={{ ...style }}>
      {text} <IconFont style={{ fontSize: font }} type={icon} />
    </span>
  );
};

export default TextIcon;
