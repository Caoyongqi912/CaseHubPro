import React from 'react';

declare namespace API {
  interface IResponse<T> {
    code: number;
    data?: T | undefined | null;
    msg: string;
  }

  interface IUser {
    id?: number;
    uid?: string;
    username?: string;
    isAdmin?: boolean;
    email?: string;
    phone?: string;
    avatar?: string;
    gender?: string;
    tagName?: string;
    departmentID?: number;
    departmentName?: string;
  }

  interface IPassword {
    new_password?: string;
    old_password?: string;
  }

  interface IDepartment {
    adminID?: number;
    desc?: string;
    id?: number;
    name: string;
    uid?: string;
    tags?: Array<string>;
  }

  interface IMoHuSearchUser {
    target: string;
    value: string;
  }

  interface IProject {
    adminID?: number;
    adminName?: string;
    create_time?: string;
    update_time?: string;
    id?: number;
    uid?: string;
    name?: string;
    desc?: string | null;
  }

  interface ILoginParams {
    username: string;
    password: string;
  }

  interface INewOrUpdateProject {
    uid?: string;
    name: string;
    desc: string | null;
    adminID?: number;
  }

  interface ISearch {
    current: number;
    pageSize: number;
    uid?: string;
    name?: string;
    status?: string;
    level?: string;
    casePartID?: number;
  }

  interface IQueryDepartmentTags {
    id?: number;
    name?: string;
  }

  interface IHost {
    id?: number;
    uid?: string;
    name?: string;
    host?: string;
    creator?: string;
    updater?: string;
  }

  interface IAPICaseInfoForm {
    name: string;
    label: string;
    required: boolean;
    message?: string;
    type: string;
    default?: string;
    placeholder?: string;
    component: null | React.ReactElement;
    span: number;
  }

  interface ICasePart {
    id?: number;
    uid?: string;
    partName?: string;
    projectID?: number | string;
    create_time?: string;
    update_time?: string | null;
    parentID?: number;
  }

  interface ICasePartResponse {
    id: number;
    uid: string;
    partName: string;
    projectID: number | null;
    create_time: string;
    update_time: string | null;
    children?: Array<ICasePartResponse>;
  }

  interface ITreeNode {
    key: number;
    name: string;
    children?: ITreeNode[];
  }

  interface IHeaders {
    id?: number;
    key?: string;
    val?: string;
  }

  interface IExtract {
    id?: number;
    key?: string;
    val?: string;
  }

  interface IAssertList {
    id?: number;
    extraOpt?: 'jsonpath' | 're';
    extraValue?: string;
    assertOpt?: string;
    expect?: any;
  }

  interface IAuth {
    username?: string;
    password?: string;
  }

  interface IInterfaceStep {
    step: number;
    name: string;
    desc?: string | null;
    url: string;
    method: string;
    http: string;
    body?: any;
    headers?: IHeaders[] | [];
    asserts?: IAssertList[] | [];
    extracts?: IExtract[] | [];
  }

  interface IInterface {
    title: string;
    desc: string | null;
    status: string;
    level: string;
    casePartID: number;
    projectID: number;
    steps: IInterfaceStep[] | [];
  }

  interface IInterfaceDetail extends IInterface {
    id: number;
    uid: string;
  }
}
