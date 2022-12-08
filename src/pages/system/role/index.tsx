import React from "react";
import { PageContainer } from "@ant-design/pro-components";
import { createPage } from "@/zero";

import ProTableContent from "./components/Content";

export default createPage({ pageId: "1000" }, () => {
  return (
    <PageContainer pageHeaderRender={false}>
      <ProTableContent />
    </PageContainer>
  );
});
