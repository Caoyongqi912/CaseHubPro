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
        path: '/user/department',
        name: '部门列表',
        access: 'isAdmin',
        component: '@/pages/User/Admin/DepartmentOpt',
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
        name: '项目列表',
        component: '@/pages/Project',
      },
      {
        path: '/project/detail/:uid',
        name: 'projectDetail',
        component: '@/pages/Project/projectDetail',
        hideInMenu: true,
      },
      {
        name: '项目环境',
        path: '/project/host',
        component: '@/pages/Project/Host',
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
        name: '测试用例',
        component: '@/pages/CaseHub',
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
        path: '/interface/caseApi/detail/projectID=:projectID&casePartID=:casePartID&uid=:uid',
        name: '接口详情',
        hideInMenu: true,
        component: '@/pages/Case/CaseAPI/ApiDetail',
      },
      {
        path: '/interface/scriptList',
        name: '接口脚本',
        component: '@/pages/Case/APIScript',
      },
      {
        path: '/interface/test',
        name: '其他',
        component: '@/pages/Case/Demo',
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
    routes: [
      {
        path: '/report/history',
        name: '构建历史',
        component: '@/pages/Report/History',
      },
      {
        path: '/report/history/detail/uid=:uid',
        name: '构建详情',
        hideInMenu: true,
        component: '@/pages/Report/History/Multiple/Detail',
      },
    ],
  },
  {
    name: 'Setting',
    path: '/setting',
    icon: 'SettingFilled',
  },
  {
    name: 'CBS',
    path: '/CBS',
    // icon: "CloudTwoTone",
    routes: [
      // {
      //   path: '/CBS/perf/maintSetting',
      //   name: '维护人业绩配置',
      //   component: '@/pages/CBS/PerfMaintSetting',
      // },
      {
        path: '/CBS/structure',
        name: 'CBS数据构造',
        routes: [
          {
            path: '/CBS/structure/sign',
            name: '草签合同',
            component: '@/pages/CBS/Structure/Sign',
          },
          {
            path: '/CBS/structure/intention',
            name: '杭州意向',
            component: '@/pages/CBS/Structure/Intention',
          },
          {
            path: '/CBS/structure/approve',
            name: '审批流',
            component: '@/pages/CBS/Structure/Approve',
          },
        ],
      },
    ],
  },
  {
    component: '@/pages/404',
  },
];
