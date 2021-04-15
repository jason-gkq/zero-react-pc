// import 'babel-polyfill';
import React from "react";
import { render } from "react-dom";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
// import reportWebVitals from "./reportWebVitals";
import "./index.css";
// window.RELEASE = RELEASE;
// render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
render(App, document.getElementById("root"));

if (process.env.NODE_ENV === "production") {
  const { register } = require("./serviceWorker");
  const reportWebVitals = require("./reportWebVitals").default;
  register({
    onSuccess: (registration) => {
      console.log(registration);
    },
    onUpdate: (registration) => {
      console.log(registration);
    },
  });
  reportWebVitals();
}
