import React, { Component } from "react";
import { BasePage } from "@/zero/core";
import model from "./index.model";
import "./index.less";

import ComponentsDemo from "./components/ComponentsDemo";
import PrintDemo from "./components/PrintDemo";
import Content from "./containers/Content";
import ModalDemo from "./containers/ModalDemo";
import NavigateDemo from "./containers/NavigateDemo";
@BasePage(model)
export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { $model, $globalActions, $globalSelectors } = this.props;
    return (
      <>
        <ComponentsDemo />
        <NavigateDemo $globalActions={$globalActions} />
        <ModalDemo $model={$model} />
        <PrintDemo />
        <Content
          $model={$model}
          $globalActions={$globalActions}
          $globalSelectors={$globalSelectors}
        />
      </>
    );
  }
}
