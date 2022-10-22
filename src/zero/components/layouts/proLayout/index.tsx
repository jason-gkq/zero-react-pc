import React, { useState, useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import type { ProSettings, MenuDataItem } from "@ant-design/pro-components";
import { connect } from "react-redux";
import { SettingDrawer, ProLayout } from "@ant-design/pro-components";
import { globalSelectors, globalActions } from "../../../redux";
import { navigate } from "../../../api";
import { Avatar, Popover, Space, Button, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";

type IProps = {
  routes: any[];
  logout: Function;
  layout: Record<string, any>;
  appName: string;
};
const menusFormat = (
  routes: MenuDataItem[],
  appName: string,
  lavel: number
) => {
  const newRoutes: MenuDataItem[] = [];
  for (let i = 0; i < routes.length; i++) {
    // 如果配置了 hideInMenu 则认为是菜单，为了过滤配置文件中非菜单选项
    if (!Reflect.has(routes[i], "hideInMenu")) {
      continue;
    }
    const { icon, children, path, redirect, ...restItme } = routes[i];

    let ICON;
    if (icon && icon != "#" && [1, 2].includes(lavel)) {
      ICON = require(`@ant-design/icons`)[String(icon)];
    }
    let newPath = String(path);
    if (lavel === 1) {
      /**
       * 第一级路由必须以 / 开头
       * 如果设置了appName 则给一级菜单添加对应前缀
       */
      if (!newPath.startsWith(`/`)) {
        newPath = `/${newPath}`;
      }
      if (!newPath.startsWith(`/${appName}`) && appName) {
        newPath = `/${appName}${newPath}`;
      }
    }
    if (children && children.length > 0) {
      const childreRoutes = menusFormat(children, appName, lavel + 1);
      newRoutes.push({
        children: childreRoutes,
        icon: ICON && <ICON />,
        path: newPath,
        redirect,
        ...restItme,
      });
    } else {
      newRoutes.push({
        icon: ICON && <ICON />,
        path: newPath,
        redirect,
        ...restItme,
      });
    }
  }
  return newRoutes;
};

const Layout = (props: IProps) => {
  const { routes, logout, layout, appName } = props;
  const location = useLocation();
  const [menus, setMenus] = useState<MenuDataItem[]>([]);
  const [pathname, setPathname] = useState(location.pathname);
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    // fixSiderbar: true,
    fixSiderbar: true,
    navTheme: "light",
    layout: "mix",
    contentWidth: "Fluid",
    headerHeight: 48,
    primaryColor: "#1890ff",
    splitMenus: true,
  });
  useEffect(() => {
    setMenus(menusFormat(routes, appName, 1));
    // console.log("menus????>>", routes);
  }, [JSON.stringify(routes)]);

  useEffect(() => {
    console.log(location);
    setPathname(location.pathname);
  }, [location.pathname]);

  const handleLogout = useMemo(
    () => () => {
      Modal.confirm({
        title: "确定注销并退出系统吗?",
        okText: "确定",
        cancelText: "取消",
        onOk: () => {
          logout();
        },
      });
    },
    [logout]
  );

  return (
    <div
      id={`${appName}-pro-layout`}
      style={{
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      <ProLayout
        title={layout.title}
        locale="zh-CN"
        logo={layout.Logo}
        menuDataRender={() => menus}
        contentStyle={{
          margin: "10px",
        }}
        // headerContentRender={() => <ProBreadcrumb />}
        // breadcrumbRender={(routers = []) => [
        //   {
        //     path: "/",
        //     breadcrumbName: "首页",
        //   },
        //   ...routers,
        // ]}
        // ErrorBoundary={pathname === '/custom' ? CustomBoundary : undefined}
        menuItemRender={(item: any, dom) => (
          <a
            onClick={() => {
              if (item.redirect && item.redirect.startsWith("/")) {
                navigate.goTo(item.redirect);
              } else {
                navigate.goTo(item.path);
              }
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => {
          const content = (
            <Space direction="vertical">
              {layout &&
                layout.profile &&
                layout.profile.map((item: any) => item)}
              <Button
                size="small"
                key={"退出登录"}
                type="link"
                onClick={handleLogout}
              >
                退出登录
              </Button>
            </Space>
          );
          return (
            <Popover placement="bottomRight" content={content}>
              <Avatar
                style={{ height: "90%" }}
                shape="square"
                size="large"
                icon={<UserOutlined />}
              />
            </Popover>
          );
        }}
        {...settings}
      >
        <Outlet />
      </ProLayout>
      {process.env.NODE_ENV === "development" && (
        <SettingDrawer
          pathname={pathname}
          enableDarkTheme
          getContainer={() => document.getElementById(`${appName}-pro-layout`)}
          settings={settings}
          onSettingChange={(changeSetting) => {
            setSetting(changeSetting);
          }}
          disableUrlParams
        />
      )}
    </div>
  );
};

export default connect(
  (state) => {
    const { appName, routes: configRoutes = [] } =
      globalSelectors.getEnv(state);
    const layout = globalSelectors.app.getLayout(state) || {};
    const routes = globalSelectors.app.getRoutes(state);
    // const menus = menusFormat(routes.concat(configRoutes), appName, 1);
    // console.log(menus);

    return { routes: routes.concat(configRoutes), layout, appName };
  },
  (dispatch) => {
    return {
      logout() {
        dispatch(
          (globalActions as any).app.logout({ actionType: "userLogout" })
        );
      },
    };
  }
)(Layout);
