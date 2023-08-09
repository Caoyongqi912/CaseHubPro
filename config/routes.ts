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
        path: '/interface/test',
        name: '调试页',
        component: '@/pages/Case/Demo',
      },
      { component: '@/pages/404' },
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
    name: 'CBS',
    path: '/CBS',
    icon: 'EditFilled',
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
            path: '/CBS/structure/house',
            name: '房源动作',
            routes: [
              {
                path: '/CBS/structure/house/newHouse',
                name: '新增房源',
                component: '@/pages/CBS/Structure/House',
              },
              {
                path: '/CBS/structure/house/job',
                name: '添加房源动作',
                component: '@/pages/CBS/Structure/House/HouseJob',
              },
            ],
          },
          {
            path: '/CBS/structure/custom',
            name: '客源动作',
            routes: [
              {
                path: '/CBS/structure/custom/addLook',
                name: '添加带看',
                component: '@/pages/CBS/Structure/Custom',
              },
            ],
          },
          {
            path: '/CBS/structure/sign',
            name: '买卖草签合同',
            component: '@/pages/CBS/Structure/Sign',
          },
          {
            path: '/CBS/structure/lease',
            name: '租赁草签合同',
            component: '@/pages/CBS/Structure/Lease',
          },
          {
            path: '/CBS/structure/finance',
            name: '正式合同收齐应收',
            component: '@/pages/CBS/Structure/Finance',
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
