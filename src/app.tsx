import React from "react";
import { createApp } from "@/zero/core";
import model from "./app.model";
import "./app.less";

// @RegisterApp({ isNeedLogin: true }, model)
// export default class App extends React.Component {
//   constructor(props: any) {
//     super(props);
//   }

//   render(): React.ReactNode {
//     return <></>;
//   }
// }

export default createApp({ isNeedLogin: true }, model);
