import React, { useState, useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import type { ProSettings } from "@ant-design/pro-layout";
import { connect } from "react-redux";
import ProLayout, {
  SettingDrawer,
  ProBreadcrumb,
} from "@ant-design/pro-layout";

import { globalSelectors, globalActions } from "../../../redux";
import { navigate } from "../../../api";
import Logo from "@/assets/logo/logo.svg";
// import { Exception } from "@/zero/components";

import { Avatar, Popover, Space, Button, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";

type IProps = {
  menus: any[];
  logout: Function;
};

const Layout = (props: IProps) => {
  const { menus, logout } = props;
  const location = useLocation();
  const [pathname, setPathname] = useState(location.pathname);
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  });

  useEffect(() => {
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
      id='admin-pro-layout'
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        title={"Zero-React"}
        locale='zh-CN'
        logo={Logo}
        menuDataRender={() => menus}
        headerContentRender={() => <ProBreadcrumb />}
        breadcrumbRender={(routers = []) => [
          {
            path: "/",
            breadcrumbName: "首页",
          },
          ...routers,
        ]}
        // ErrorBoundary={pathname === '/custom' ? CustomBoundary : undefined}
        menuItemRender={(item: any, dom) => (
          <a
            onClick={() => {
              navigate.goTo(item.path);
            }}
          >
            {dom}
          </a>
        )}
        rightContentRender={() => {
          const content = (
            <Space direction='vertical'>
              <Button
                size='small'
                type='link'
                onClick={() => {
                  navigate.goTo("/system/user/profile");
                }}
              >
                个人中心
              </Button>
              <Button size='small' type='link' onClick={handleLogout}>
                退出登录
              </Button>
            </Space>
          );
          return (
            <Popover placement='bottomRight' content={content}>
              <Avatar
                style={{ height: "90%" }}
                shape='square'
                size='large'
                icon={<UserOutlined />}
              />
            </Popover>
          );
        }}
        {...settings}
      >
        <Outlet />
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
        enableDarkTheme
        getContainer={() => document.getElementById("admin-pro-layout")}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting);
        }}
        disableUrlParams
      />
    </div>
  );
};
export default connect(
  (state) => {
    const { appName } = globalSelectors.getEnv(state);
    let menus = globalSelectors.app.getMenus(state);
    if (appName) {
      /**
       * 第一级路由必须以 / 开头
       * 如果设置了appName 则给一级菜单添加对应前缀
       */
      for (let i = 0; i < menus.length; i++) {
        let path = menus[i]["path"];
        if (!path.startsWith(`/`)) {
          path = `/${path}`;
        }
        if (!path.startsWith(`/${appName}`)) {
          path = `/${appName}${path}`;
        }
        menus[i]["path"] = path;
      }
    }
    return { menus };
  },
  (dispatch) => {
    return {
      logout() {
        dispatch((globalActions as any).app.logout({}));
      },
    };
  }
)(Layout);
