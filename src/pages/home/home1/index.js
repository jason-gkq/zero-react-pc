import React, { Component } from "react";
import { BasePage } from "@/common/core";
import model from "./index.model";

import DivTest from "./containers/DivTest";
@BasePage(model)
class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { $model, $globalActions, $globalSelectors } = this.props;
    return (
      <DivTest
        $model={$model}
        $globalActions={$globalActions}
        $globalSelectors={$globalSelectors}
      />
    );
  }
}
export default Home;
