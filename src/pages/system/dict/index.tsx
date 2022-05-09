import React from "react";
import { PageContainer } from "@ant-design/pro-layout";
import { RegisterPage } from "@/zero/core";
import { MemoComponent } from "@/zero/components";
import type { IProps } from "@/zero/types/zero";

import Content from "./containers/Content";

@RegisterPage({ pageId: "1000" })
export default class extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  render(): React.ReactNode {
    return (
      <PageContainer pageHeaderRender={false}>
        <MemoComponent>
          <Content />
        </MemoComponent>
      </PageContainer>
    );
  }
}