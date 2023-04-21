import React, { useRef } from 'react';

import { SetExtract } from '@/pages/Case/CaseAPI/MyHook/func';
import { API } from '@/api';

type ExtractsRef = React.MutableRefObject<API.IExtract[][]>;

const UseExtract = (): [ExtractsRef, SetExtract] => {
  const ExtractsRef = useRef<API.IExtract[][]>([]);

  const SetExtract: SetExtract = (step, extract, del) => {
    if (del) {
      ExtractsRef.current.splice(step, 1);
    }
    {
      ExtractsRef.current[step] = extract!;
    }
  };
  return [ExtractsRef, SetExtract];
};

export default UseExtract;
