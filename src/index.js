// import 'babel-polyfill';
import Zero from "@/zero/vendor/zero";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

reportWebVitals((data) => {
  sessionStorage.setItem(data.name, JSON.stringify(data));
  if (__ENV__ === "local") {
    console.log(data);
  }
});

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
