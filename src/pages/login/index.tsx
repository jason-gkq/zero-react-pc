import React from "react";
import { RegisterPage } from "@/zero/core";
import type { IProps } from "@/zero/types/zero";

import Content from "./components/Content";

@RegisterPage({ pageId: "1000", isNeedLogin: false })
export default class extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  render(): React.ReactNode {
    const { $payload } = this.props;
    return <Content {...{ $payload }} />;
  }
}
