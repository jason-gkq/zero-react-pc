import React from "react";
import { BaseApp } from "@/common/core";
import model from "./app.model";
import "./app.less";

@BaseApp(model)
class App extends React.Component {
  constructor(props) {
    super(props);
  }
}

export default App;
