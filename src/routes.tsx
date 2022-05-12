import React from "react";

/**
 * 先菜单配置有问题，等修复之后废弃本地路由配置，改用接口
 * 菜单配置规则
 * 1. 菜单类型分为：目录、菜单和操作
 * 2. 非叶子节点只能为目录
 * 3. 叶子节点只能配置为菜单
 * 4. 叶子节点下面可以配菜单和操作，若配置菜单则必须为隐藏
 * 5. 每个叶子节点下面配置一个查询操作权限，这个操作对应权限为当前菜单的查询权限，如果不配置则为所有人都可以访问
 * 6. 每个权限标识需要和开发人员提前约定好，一旦上线不可变更
 *
 * 菜单现有问题：
 * 1. 运营管理中叶子节点不是菜单类型
 * 2. 多余配置了 controller 为叶子节点来管理查询
 *
 */

export default (): Record<string, React.ReactNode> => {
  return {
    "index/index": React.lazy(
      () =>
        import(
          /* webpackChunkName: 'index' */ /* webpackPrefetch: true */ "@/src/pages/index"
        )
    ),
    "system/user/profile/index": React.lazy(
      () =>
        import(
          /* webpackMode: "lazy" */ /* webpackChunkName: 'system-user' */ "@/src/pages/system/user/profile"
        )
    ),
    "system/dict/data/index": React.lazy(
      () =>
        import(
          /* webpackMode: "lazy" */ /* webpackChunkName: 'system-dict' */ "@/src/pages/system/dict/data"
        )
    ),
    "system/user/index": React.lazy(
      () =>
        import(
          /* webpackMode: "lazy" */ /* webpackChunkName: 'system-user' */ "@/src/pages/system/user"
        )
    ),
    "system/role/index": React.lazy(
      () =>
        import(
          /* webpackMode: "lazy" */ /* webpackChunkName: 'system-role' */ "@/src/pages/system/role"
        )
    ),
    "system/menu/index": React.lazy(
      () =>
        import(
          /* webpackMode: "lazy" */ /* webpackChunkName: 'system-menu' */ "@/src/pages/system/menu"
        )
    ),
    "system/dept/index": React.lazy(
      () =>
        import(
          /* webpackMode: "lazy" */ /* webpackChunkName: 'system-dept' */ "@/src/pages/system/dept"
        )
    ),
    "system/post/index": React.lazy(
      () =>
        import(
          /* webpackMode: "lazy" */ /* webpackChunkName: 'system-post' */ "@/src/pages/system/post"
        )
    ),
    "system/dict/index": React.lazy(
      () =>
        import(
          /* webpackMode: "lazy" */ /* webpackChunkName: 'system-dict' */ "@/src/pages/system/dict"
        )
    ),
    "system/config/index": React.lazy(
      () =>
        import(
          /* webpackMode: "lazy" */ /* webpackChunkName: 'system-config' */ "@/src/pages/system/config"
        )
    ),
    "system/notice/index": React.lazy(
      () =>
        import(
          /* webpackMode: "lazy" */ /* webpackChunkName: 'system-notice' */ "@/src/pages/system/notice"
        )
    ),
  };
  // return [
  //   {
  //     path: "login",
  //     isNoneLayout: true,
  //     Element: React.lazy(
  //       () => import(/* webpackChunkName: 'login' */ "@/src/pages/login")
  //     ),
  //   },
  //   {
  //     path: "index",
  //     index: true,
  //     Element: React.lazy(
  //       () => import(/* webpackChunkName: 'index' */ "@/src/pages/index")
  //     ),
  //   },
  //   {
  //     path: "system",
  //     children: [
  //       {
  //         path: "user",
  //         Element: React.lazy(
  //           () =>
  //             import(
  //               /* webpackChunkName: 'system-user' */ "@/src/pages/system/user"
  //             )
  //         ),
  //       },
  //       {
  //         path: "user/profile",
  //         Element: React.lazy(
  //           () =>
  //             import(
  //               /* webpackChunkName: 'system-user' */ "@/src/pages/system/user/profile"
  //             )
  //         ),
  //       },
  //       {
  //         path: "role",
  //         Element: React.lazy(
  //           () =>
  //             import(
  //               /* webpackChunkName: 'system-role' */ "@/src/pages/system/role"
  //             )
  //         ),
  //       },
  //       {
  //         path: "menu",
  //         Element: React.lazy(
  //           () =>
  //             import(
  //               /* webpackChunkName: 'system-menu' */ "@/src/pages/system/menu"
  //             )
  //         ),
  //       },
  //       {
  //         path: "dept",
  //         Element: React.lazy(
  //           () =>
  //             import(
  //               /* webpackChunkName: 'system-dept' */ "@/src/pages/system/dept"
  //             )
  //         ),
  //       },
  //       {
  //         path: "post",
  //         Element: React.lazy(
  //           () =>
  //             import(
  //               /* webpackChunkName: 'system-post' */ "@/src/pages/system/post"
  //             )
  //         ),
  //       },
  //       {
  //         path: "dict",
  //         Element: React.lazy(
  //           () =>
  //             import(
  //               /* webpackChunkName: 'system-dict' */ "@/src/pages/system/dict"
  //             )
  //         ),
  //       },
  //       {
  //         path: "dict/data",
  //         Element: React.lazy(
  //           () =>
  //             import(
  //               /* webpackChunkName: 'system-dict' */ "@/src/pages/system/dict/data"
  //             )
  //         ),
  //       },
  //       {
  //         path: "config",
  //         Element: React.lazy(
  //           () =>
  //             import(
  //               /* webpackChunkName: 'system-config' */ "@/src/pages/system/config"
  //             )
  //         ),
  //       },
  //       {
  //         path: "notice",
  //         Element: React.lazy(
  //           () =>
  //             import(
  //               /* webpackChunkName: 'system-notice' */ "@/src/pages/system/notice"
  //             )
  //         ),
  //       },
  //     ],
  //   },
  // ];
};
