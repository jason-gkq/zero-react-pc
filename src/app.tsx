import React from "react";
import { RegisterApp } from "@/zero/core";
import model from "./app.model";
import "./app.less";

@RegisterApp({ isNeedLogin: true }, model)
export default class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    return <></>;
  }
}
