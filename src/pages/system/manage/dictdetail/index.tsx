import React from "react";
import { PageContainer } from "@ant-design/pro-components";
import { createPage, ICProps } from "@/zero";

import Content from "./components/Content";

export default createPage({ pageId: "1000" }, ({ $payload }: ICProps) => {
  return (
    <PageContainer pageHeaderRender={false}>
      <Content $payload={$payload} />
    </PageContainer>
  );
});
