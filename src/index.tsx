// import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(<App />, document.getElementById("root"));
if ((module as any).hot) (module as any).hot.accept();
reportWebVitals((data) => {
  sessionStorage.setItem(data.name, JSON.stringify(data));
  if (!["prod", "pre"].includes((process as any).env.ENV)) {
    console.log(data);
  }
});

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
