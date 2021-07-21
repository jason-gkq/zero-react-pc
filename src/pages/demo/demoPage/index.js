import React, { Component } from "react";
import { BasePage } from "@/common/core";
import model from "./index.model";
import "./index.less";

import Content from "./containers/Content";

@BasePage(model)
export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { $model, $globalActions, $globalSelectors } = this.props;
    return (
      <Content
        $model={$model}
        $globalActions={$globalActions}
        $globalSelectors={$globalSelectors}
      />
    );
  }
}
