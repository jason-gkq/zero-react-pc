module.exports.defineConfig = () => ({
  appId: "100",
  appName: "admin",
  cachePrefix: "admin_",
  route: {
    type: "Browser", // Browser | Hash 可以调整路由方式，如果选择hash则最好去掉appName，且调整publicUrlOrPath
    showRoutesTab: true,
    routesHistoryLength: 50,
  },
  layout: {
    title: "管理中台",
    index: "/index/index",
  },
  webpackConfig: {
    publicUrlOrPath: "/admin/",
    devServer: {
      port: 3200,
      host: "localhost",
    },
  },
  routes: [
    {
      path: "login",
      name: "登录",
      isNoneLayout: true,
    },
    {
      path: "index",
      name: "首页",
      hideInMenu: false,
      icon: "HomeOutlined",
      component: "index/index",
      redirect: "/index/index",
      children: [
        {
          path: "index",
          icon: "HomeOutlined",
          hideInMenu: false,
          name: "首页",
        },
      ],
    },
    {
      path: "system",
      name: "系统",
      icon: "SettingOutlined",
      hideInMenu: false,
      redirect: "/system/user",
      children: [
        {
          path: "profile",
          hideInMenu: true,
          name: "个人中心",
        },
        {
          path: "user",
          hideInMenu: false,
          icon: "UserOutlined",
          name: "用户列表",
        },
        {
          path: "menu",
          hideInMenu: false,
          icon: "ProfileOutlined",
          name: "菜单管理",
        },
        {
          path: "role",
          hideInMenu: false,
          icon: "RobotOutlined",
          name: "角色管理",
        },
        {
          path: "manage",
          hideInMenu: false,
          icon: "ToolOutlined",
          name: "公共管理",
          children: [
            { path: "config", hideInMenu: false, name: "参数设置" },
            { path: "dict", hideInMenu: false, name: "字典管理" },
            { path: "dictdetail", hideInMenu: true, name: "字典详情" },
            { path: "notice", hideInMenu: false, name: "公告管理" },
          ],
        },
      ],
    },
  ],
});
