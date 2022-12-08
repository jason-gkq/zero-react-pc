import React from "react";
import { PageContainer } from "@ant-design/pro-components";
import { createPage } from "@/zero";

import Content from "./components/Content";

export default createPage({ pageId: "1000" }, ({ $payload }: any) => {
  return (
    <PageContainer pageHeaderRender={false}>
      <Content $payload={$payload} />
    </PageContainer>
  );
});
