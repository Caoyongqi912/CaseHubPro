import React from 'react';

declare namespace API {
  interface IResponse<T> {
    code: number;
    data?: T | undefined;
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

  interface ICaseDetail {
    name: string;
    label: string;
    required: boolean;
    message?: string;
    type: string;
    placeholder?: string;
    component: null | React.ReactElement;
    span: number;
  }

  interface ICasePart {
    id: number;
    uid: string;
    name: string;
    projectID: number | string;
    create_time: string;
    update_time: string | null;
    parentID: string | null;
  }
}
