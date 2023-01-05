declare namespace API {
  interface IResponse {
    code: number;
    data?: any;
    msg: string;
  }

  interface IUser {
    id: number;
    uid: string;
    username: string;
    isAdmin?: boolean;
    avatar?: string;
    gender?: string;
    tag?: string;
    departmentID?: number;
  }

  interface IMoHuSearchUser {
    target: string;
    value: string;
  }

  interface IProject {
    adminID: number;
    create_time: string;
    update_time: string;
    id: number;
    uid: string;
    name: string;
    desc: string | null;
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
}
