import React from "react";
import { PageContainer } from "@ant-design/pro-components";
import { createPage } from "@/zero";
import "./index.less";

type IProps = any;

import Content from "./components/Content";

export default createPage({ pageId: "1000" }, (props: IProps) => {
  return (
    <PageContainer pageHeaderRender={false}>
      <Content />
    </PageContainer>
  );
});
