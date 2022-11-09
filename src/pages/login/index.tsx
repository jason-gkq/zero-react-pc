import React from "react";
import { createPage } from "@/zero/core";
import type { IProps } from "@/zero/types/zero";

import Content from "./components/Content";

createPage({ pageId: "1000", isNeedLogin: false }, (props: IProps) => {
  return <Content {...props} />;
});
