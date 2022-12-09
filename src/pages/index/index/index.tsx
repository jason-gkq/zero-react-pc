import React from "react";
import { PageContainer } from "@ant-design/pro-components";
import { createPage, ICProps } from "@/zero";
import "./index.less";

import Content from "./components/Content";

export default createPage({ pageId: "1000" }, (props: ICProps) => {
  return (
    <PageContainer pageHeaderRender={false}>
      <Content />
    </PageContainer>
  );
});
