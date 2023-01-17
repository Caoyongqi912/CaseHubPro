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
        path: '/project/table',
        name: 'projectOpt',
        component: '@/pages/Project',
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
    path: '/api',
    name: 'API',
    icon: 'ApiFilled',
  },
  {
    component: '@/pages/404',
  },
];
