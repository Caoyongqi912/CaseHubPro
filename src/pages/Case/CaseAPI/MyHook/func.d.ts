import { API } from '@/api';
import { FormInstance } from 'antd';

export type SetHeaders = (
  step: number,
  header: API.IHeaders[] | null,
  del?: boolean,
) => void;

export type SetParams = (
  step: number,
  params: API.IParams[] | null,
  del?: boolean,
) => void;

export type SetBody = (step: number, body: any, del?: boolean) => void;
export type SetAsserts = (
  step: number,
  asserts: API.IAssertList[] | null,
  del?: boolean,
) => void;

export type SetExtract = (
  step: number,
  extract: API.IExtract[] | null,
  del?: boolean,
) => void;
export type SetFormInstance = (form: FormInstance) => void;
