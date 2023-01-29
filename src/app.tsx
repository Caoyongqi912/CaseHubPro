import { history } from 'umi';
import { currentUser } from '@/api/user';
import { PageLoading } from '@ant-design/pro-components';
import { RunTimeLayoutConfig } from 'umi';
import RightContent from '@/components/RightContent';
import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { RequestConfig } from '@@/plugin-request/request';
import { getToken } from '@/utils/token';
import { message } from 'antd';

const loginPath = '/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.IUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.IUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const res = await currentUser();
      return res.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  console.log('==user==', initialState?.currentUser?.username);
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    //水印
    waterMarkProps: {
      content: initialState?.currentUser?.username,
    },
    onPageChange: () => {
      const { location } = history;
      console.log('===onPageChange===', location.pathname);
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    // 自定义 403 页面
    unAccessible: <div>unAccessible</div>,
    childrenRender: (children, props) => {
      if (initialState?.loading) return <PageLoading />;
      return <>{children}</>;
    },
    ...initialState?.settings,
  };
};

const requestInterceptors = (url: string, options: RequestConfig) => {
  const token = getToken();
  if (token !== null) {
    const authHeader = { Authorization: 'Basic ' + btoa(token + ':' + '') };
    return {
      url: `${url}`,
      options: { ...options, interceptors: true, headers: authHeader },
    };
  }
  return {
    url: `${url}`,
    options: { ...options, interceptors: true },
  };
};
const responseInterceptors = async (response: Response) => {
  const resp: API.IResponse<any> = await response.clone().json();
  if (resp.code != 0) {
    message.error(resp.msg);
  }
  return response;
};

export const request: RequestConfig = {
  requestInterceptors: [requestInterceptors],
  responseInterceptors: [responseInterceptors],
};
// https://github.com/wuranxu/pityWeb.git
//https://pity.fun/#/account/settings
