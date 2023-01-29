export default [
  {
    path: '/login',
    exact: true,
    component: '@/pages/User/Login',
    layout: false,
  },
  {
    path: '/home',
    name: 'Home',
    icon: 'home',
    component: '@/pages/index',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/user',
    name: 'User',
    icon: 'user',
    access: 'admin',
    routes: [
      {
        path: '/user/admin',
        name: 'admin',
        access: 'isAdmin',
        component: '@/pages/User/Admin',
      },
      {
        path: '/user/center',
        name: 'current',
        component: '@/pages/User/Center',
        hideInMenu: true,
      },
      { component: '@/pages/404' },
    ],
  },
  {
    path: '/project',
    name: 'Project',
    icon: 'project',
    routes: [
      {
        path: '/project/List',
        name: 'projectOpt',
        component: '@/pages/Project',
      },
      {
        path: '/project/detail/:uid',
        name: 'projectDetail',
        component: '@/pages/Project/projectDetail',
        hideInMenu: true,
      },
      {
        component: '@/pages/404',
      },
    ],
  },
  {
    path: '/cases',
    name: 'Cases',
    icon: 'BuildFilled',
    routes: [
      {
        path: '/cases/table',
        name: 'caseOpt',
      },
    ],
  },
  {
    path: '/interface',
    name: 'API',
    icon: 'ApiFilled',
    routes: [
      {
        path: '/interface/caseApi',
        name: '接口用例',
        component: '@/pages/Case/CaseAPI',
      },
      {
        path: '/interface/test',
        name: '其他',
      },
      { component: '@/pages/404' },
    ],
  },
  {
    path: '/bug',
    name: 'Bugs',
    icon: 'BugFilled',
    routes: [
      {
        path: '/bug/table',
        name: 'bugOpt',
      },
    ],
  },
  {
    path: '/report',
    name: 'Reports',
    icon: 'BookFilled',
  },

  {
    name: 'Setting',
    path: '/setting',
    icon: 'SettingFilled',
    routes: [
      {
        name: 'host',
        path: '/setting/host',

        component: '@/pages/Setting/Host',
      },
    ],
  },
  {
    component: '@/pages/404',
  },
];
