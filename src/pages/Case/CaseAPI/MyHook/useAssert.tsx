import React, { useRef } from 'react';
import { API } from '@/api';
import { SetAsserts } from '@/pages/Case/CaseAPI/MyHook/func';

type AssertsRef = React.MutableRefObject<API.IAssertList[][]>;

/**
 * UseAssert
 * @constructor
 */
const UseAssert = (): [AssertsRef, SetAsserts] => {
  const AssertsRef = useRef<API.IAssertList[][]>([]);
  const SetAsserts: SetAsserts = (step, asserts, del) => {
    if (del) {
      AssertsRef.current.splice(step, 1);
    } else {
      AssertsRef.current[step] = asserts!;
    }
  };
  return [AssertsRef, SetAsserts];
};

export default UseAssert;
