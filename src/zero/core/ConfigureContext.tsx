import React from "react";
import { ConfigProvider } from "antd";

import { ModalContextComponent } from "../components/basic/NiceModal";

export const AppConfigContext = React.createContext({});
AppConfigContext.displayName = "AppConfigContext";

export const ModalContext = React.createContext({});
ModalContext.displayName = "ModalContext";

export default (props: any) => {
  const { children, locale, appConfig } = props;
  return (
    <AppConfigContext.Provider value={appConfig}>
      {/* <ThemeContext.Provider value={$theme}> */}
      <ModalContextComponent>
        <ConfigProvider locale={locale}>{children}</ConfigProvider>
      </ModalContextComponent>
      {/* </ThemeContext.Provider> */}
    </AppConfigContext.Provider>
  );
};
