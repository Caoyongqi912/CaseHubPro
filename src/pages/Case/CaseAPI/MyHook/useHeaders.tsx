import React, { useRef } from 'react';
import { API } from '@/api';
import { SetHeaders } from '@/pages/Case/CaseAPI/MyHook/func';
type HeadersRef = React.MutableRefObject<API.IHeaders[][]>;

/**
 * postman headers
 * @constructor
 */
const UseHeaders = (): [HeadersRef, SetHeaders] => {
  const headersRef = useRef<API.IHeaders[][]>([]);

  const SetHeaders: SetHeaders = (step, header, del) => {
    if (del) {
      headersRef.current.splice(step, 1);
    } else {
      headersRef.current[step] = header!;
    }
  };
  return [headersRef, SetHeaders];
};

export default UseHeaders;
