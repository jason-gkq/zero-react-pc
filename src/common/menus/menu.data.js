/**
 * 菜单列表
 * path需要保持唯一
 * permKey表示权限Key值
 * permKey: true表示所有用户都有权限
 * transKey表示翻译文本对应的key
 */
export const menus = [
  {
    name: "首页",
    transKey: "Home",
    path: "/lcbtest",
    icon: "home",
    permKey: true,
    children: [],
  },
  {
    name: "系统配置",
    transKey: "System Configuration",
    path: "/lcbtest/system",
    icon: "laptop",
    permKey: "menu.system",
    children: [],
  },
  {
    name: "用户管理",
    transKey: "User Management",
    path: "/lcbtest/users",
    icon: "user",
    permKey: "menu.users",
    children: [
      {
        name: "用户管理",
        transKey: "User Management",
        path: "/lcbtest/users/userManage",
        permKey: "menu.userManage",
        children: [],
      },
      {
        name: "角色管理",
        transKey: "Role Management",
        path: "/lcbtest/users/roleManage",
        permKey: "menu.roleManage",
        children: [],
      },
    ],
  },
  {
    name: "Example页",
    transKey: "Example Page",
    path: "/lcbtest/example",
    icon: "laptop",
    permKey: "srm.route_example",
    children: [],
  },
  {
    name: "虚拟表格",
    path: "/lcbtest/vtable",
    icon: "table",
    permKey: true,
    children: [],
  },
  {
    name: "数据转换",
    path: "/lcbtest/exchange",
    icon: "box-plot",
    permKey: true,
    children: [],
  },
  {
    name: "运营工具",
    path: "/lcbtest/optool",
    icon: "tool",
    permKey: "srm.route_optool",
    children: [
      {
        name: "异常处理",
        path: "/lcbtest/optool/exceptionHandle",
        permKey: "srm.route_exception-handle",
        children: [],
      },
    ],
  },
];
