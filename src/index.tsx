import "core-js";
import "./public-path";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import reportWebVitals from "./reportWebVitals";

const { appName } = process.env.productConfig as any;

let root: any;
function render(props: any) {
  const { container } = props;
  root = createRoot(
    container
      ? (container.querySelector(`#${appName}`) as Element)
      : (document.querySelector(`#${appName}`) as Element)
  );

  root.render(<App />);

  if ((module as any).hot) (module as any).hot.accept();
  reportWebVitals((data) => {
    sessionStorage.setItem(data.name, JSON.stringify(data));
    if (!["prod", "pre"].includes((process as any).env.ENV)) {
      console.log(data);
    }
  });
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({});
}
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
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log("react app bootstraped");
}
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props: any) {
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props: any) {
  root &&
    root.unmountComponentAtNode(
      props.container
        ? props.container.querySelector(`#${appName}`)
        : document.getElementById(`#${appName}`)
    );
}
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props: any) {
  console.log("update props", props);
}
