import React, { Component } from "react";
import { BasePage } from "@/common/core";
import model from "./index.model";

import DivTest from "./containers/DivTest";
@BasePage(model)
class Home extends Component {
  constructor(props) {
    super(props);
    // console.log("home-props----", props);
  }

  render() {
    const { $model, $globalActions } = this.props;
    return <DivTest $model={$model} $globalActions={$globalActions} />;
  }
}
export default Home;
