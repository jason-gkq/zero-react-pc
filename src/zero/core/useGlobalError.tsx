/**
 * 可忽略报错
 * 1. ErrorEvent：ResizeObserver loop limit exceeded
 *  ResizeObserver无法在单个动画帧中提供所有观察值，是良性的，无需上报
 *  多发于组件第一次注册和动态元素
 */
export default () => {
  /**
   * 添加事件监听
   */
  window.onerror = function (message, url, line, column, error) {
    if (message == "ResizeObserver loop limit exceeded") {
      return;
    }
    console.warn("onerror:", message, url, line, column, error);
  };
  // new Image错误，不能捕获
  // fetch错误，不能捕获
  window.addEventListener(
    "error",
    (error) => {
      const { message } = error;
      if (
        error instanceof ErrorEvent &&
        message === "ResizeObserver loop limit exceeded"
      ) {
        return;
      }
      console.warn("addEventListener.error", error);
    },
    true
  );
  // window.addEventListener("click", (e) => {
  //   console.log("click..", e);
  // });
  // 全局统一处理Promise
  window.addEventListener("unhandledrejection", function (e) {
    console.warn("addEventListener.unhandledrejection ：", e);
  });
  // window.addEventListener("resize", function () {
  // if(window.innerWidth <= 800) {
  //     div.style.display = 'none';
  // } else {
  //     div.style.display = 'block';
  // }
  // });
  return true;
};
