import React, { useRef } from 'react';
import { SetBody } from '@/pages/Case/CaseAPI/MyHook/func';

type BodyRef = React.MutableRefObject<any>;

/**
 * UseBody
 * @constructor
 */
const UseBody = (): [BodyRef, SetBody] => {
  const BodyRef = useRef<any[]>([]);

  const SetBody: SetBody = (step, b, del) => {
    if (del) {
      BodyRef.current.splice(step, 1);
    } else {
      BodyRef.current[step] = b!;
    }
  };
  return [BodyRef, SetBody];
};

export default UseBody;
