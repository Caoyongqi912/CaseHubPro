import { API } from '@/api';
import { FormInstance } from 'antd';

export type setHeaders = (
  step: number,
  header: API.IHeaders[] | null,
  del?: boolean,
) => void;
export type setParams = (
  step: number,
  params: API.IParams[] | null,
  del?: boolean,
) => void;
export type setBody = (step: number, body: any | null, del?: boolean) => void;
export type setAsserts = (
  step: number,
  asserts: API.IAssertList[] | null,
  del?: boolean,
) => void;
export type setExtract = (
  step: number,
  extract: API.IExtract[] | null,
  del?: boolean,
) => void;
export type SetFormInstance = (form: FormInstance) => void;
