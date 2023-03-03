import React, { FC, useEffect, useState } from 'react';
import { Card, Table } from 'antd';
import { ResponseAPI } from '@/api';

interface SelfProps {
  requestHeaders: [key: string | any][];
  responseHeaders: [key: string | any][];
}

const HeaderTable: FC<SelfProps> = (props) => {
  const { requestHeaders, responseHeaders } = props;
  const [reqHeaders, setReqHeaders] = useState<[key: string | any][]>([]);
  const [respHeaders, setRespHeaders] = useState<[key: string | any][]>([]);

  // useEffect(() => {
  //   setHeadersData(resultInfo);
  //
  // }, [resultInfo]);
  return <></>;
};

export default HeaderTable;
