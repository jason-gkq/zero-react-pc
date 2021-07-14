/**
 * 项目入口
 *  web
 *  小程序入口
 */
// import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
// if (process.env.NODE_ENV === "production") {
//   const reportWebVitals = require("./reportWebVitals").default;
//   serviceWorker.register({
//     onSuccess: (registration) => {
//       console.log(registration);
//     },
//     onUpdate: (registration) => {
//       console.log(registration);
//     },
//   });
//   reportWebVitals();
// } else {
//   serviceWorker.unregister();
// }
