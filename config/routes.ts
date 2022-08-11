export default [
  {
    path: "/login",
    exact: true,
    component: "@/pages/User/Login",
    layout: false
  },
  {
    path: "/home",
    name: "Home",
    icon: "home",
    component: "@/pages/index"
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/user",
    name: "User",
    icon: "user",
    routes: [
      {
        path: "/user/admin",
        name: "admin",
        access: "isAdmin",
        component: "@/pages/User/Admin"
      }, //access: "isAdmin",
      {
        path: "/user/editor",
        name: "editor",
        component: "@/pages/User/Editor"
      },
      { component: "@/pages/404" }
    ]
  },
  {
    path: "/project",
    name: "Project",
    icon: "project",
    routes: [
      {
        path: "/project/table",
        name: "my project",
        component: "@/pages/Project"
      },
      {
        component: "@/pages/404"
      }
    ]

  },
  {
    component: "@/pages/404"
  }
];
