export const routes = [
  {
    path: 'index',
    name: '首页',
    hideInMenu: false,
    icon: 'HomeOutlined',
    component: 'index/index',
    redirect: '/index/index',
    children: [
      {
        path: 'index',
        icon: 'HomeOutlined',
        hideInMenu: false,
        name: '首页',
      },
    ],
  },
  {
    path: 'news',
    component: 'common/plugins',
    name: '消息',
    hideInMenu: false,
    icon: 'HomeOutlined',
    isPlugin: true,
    children: [
      {
        path: 'user',
        hideInMenu: false,
        icon: 'UserOutlined',
        name: '用户列表',
      },
      {
        path: 'roles',
        hideInMenu: false,
        icon: 'RobotOutlined',
        name: '角色管理',
      },
    ],
  },
  {
    path: 'system',
    name: '系统',
    icon: 'SettingOutlined',
    hideInMenu: false,
    redirect: '/system/user',
    children: [
      {
        path: 'user',
        hideInMenu: false,
        icon: 'UserOutlined',
        name: '用户列表',
      },
      {
        path: 'menu',
        hideInMenu: false,
        icon: 'ProfileOutlined',
        name: '菜单管理',
      },
      {
        path: 'role',
        hideInMenu: false,
        icon: 'RobotOutlined',
        name: '角色管理',
      },
      {
        path: 'profile',
        hideInMenu: true,
        name: '个人中心',
      },
    ],
  },
  {
    path: 'login',
    name: '登录',
    isNoneLayout: true,
  },
  {
    path: 'tools',
    isNoneLayout: true,
  },
];
