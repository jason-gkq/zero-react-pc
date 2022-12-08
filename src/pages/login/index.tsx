import React from "react";
import { createPage } from "@/zero";

import Content from "./components/Content";

createPage({ pageId: "1000", isNeedLogin: false }, (props: any) => {
  return <Content {...props} />;
});
