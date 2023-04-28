import React from 'react';

declare const CurrentEnv: 'dev' | 'prd';
declare namespace API {
  interface IObjGet {
    [key: string | number]: any;
  }

  interface IResponse<T> {
    code: number;
    data: T;
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
    component: Function | null;
    span?: number;
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

  interface IParams {
    id?: number;
    key?: string;
    val?: string;
  }

  interface IHeaders {
    id?: number;
    key?: string;
    val?: string;
  }

  interface IExtract {
    id?: number;
    key?: string;
    target?: string;
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
    params?: IParams[] | [];
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

  interface ICaseStepInfo {
    step: number | undefined;
    todo: string;
    exp: string;
  }

  interface ICaseInfo {
    id: number;
    uid: string;
    projectID: number;
    casePartID: number;
    case_title: string;
    case_desc: string;
    case_info: ICaseStepInfo[];
    case_mark?: string;
    case_type: 'COMMENT' | 'SMOKE';
    case_level: 'P1' | 'P2' | 'P3' | 'P4';
    creator: number;
    creatorName: string;
    updaterID?: number;
    updaterName?: string;
  }
}

declare namespace ResponseAPI {
  interface IDepartmentResponse {
    id: number;
    uid: string;
    adminID: number;
    adminName: string;
    name: string;
    desc: string | null;
    create_time: string;
    update_time: string | null;
  }

  interface IDepartmentPage {
    items: IDepartmentResponse[];
    pageInfo: IPageInfo;
  }

  interface IPageInfo {
    code: number;
    limit: number;
    page: number;
    pages: number;
    total: number;
    msg: string;
  }

  interface IHostResponse {
    id: number;
    uid: string;
    name: string;
    host: string;
    port: string;
    desc: string | null;
    creatorID: number;
    creatorName: string;
    updaterID: number;
    updaterName: string | null;
    create_time: string;
    update_time: string | null;
  }

  interface IQueryPartTree {
    id: number;
    parentID: number | null;
    partName: string;
    projectID: number;
    uid: string;
    create_time: string;
    update_time: string | null;
    children: IQueryPartTree[] | [];
  }

  interface IPageHost {
    items: IHostResponse[] | [];
    pageInfo: IPageInfo;
  }

  interface IRequest {
    headers: [key: string | any][];
    method: string;
  }

  interface IResponse {
    cookie: any[];
    elapsed: string;
    headers: [key: string | any][];
    response: any;
    status_code: number;
  }

  interface IVerify {
    actual: any;
    assertOpt: string;
    expect: any;
    extraOpt: string;
    extraValue: string;
    id: number;
    result: boolean;
  }

  interface IApiResponseResultInfo {
    request: IRequest;
    response: IResponse;
    step: number;
    verify: IVerify[];
  }

  interface IApiResponse {
    id: number;
    interfaceID: number;
    create_time: string;
    update_time: string;
    interfaceName: string;
    interfaceLog: string;
    interfaceSteps: number;
    starterID: number;
    starterName: string;
    status: string;
    uid: string;
    useTime: string;
    resultInfo: IApiResponseResultInfo[];
  }

  interface IQueryHost {
    id: number;
    uid: string;
    name: string;
    host: string;
    port: string;
    desc: string;
    create_time: string;
    update_time: string;
    creatorID: number;
    creatorName: string;
    updaterID: number;
    updaterName: string;
  }
}
