import React, { useRef } from 'react';
import { API } from '@/api';
import { SetParams } from '@/pages/Case/CaseAPI/MyHook/func';
type ParamsRef = React.MutableRefObject<API.IParams[][]>;

/**
 * UseParams
 * @constructor
 */
const UseParams = (): [ParamsRef, SetParams] => {
  const ParamsRef = useRef<API.IParams[][]>([]);

  const setParams: SetParams = (step, param, del) => {
    if (del) {
      ParamsRef.current.splice(step, 1);
    } else {
      ParamsRef.current[step] = param!;
    }
  };
  return [ParamsRef, setParams];
};

export default UseParams;
