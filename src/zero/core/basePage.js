import React from "react";
import RegisterPage from "./registerPage";
import { ErrorBoundary } from "../components";

export default (pageModel) => (WrappedComponent) => {
  @RegisterPage(pageModel)
  class BasePageComponent extends WrappedComponent {
    constructor(props) {
      super(props);
    }

    // static getDerivedStateFromError(error) {
    //   // 更新 state 使下一次渲染可以显示降级 UI
    //   return { hasError: true };
    // }

    // componentDidCatch(error, info) {
    //   // "组件堆栈" 例子:
    //   //   in ComponentThatThrows (created by App)
    //   //   in ErrorBoundary (created by App)
    //   //   in div (created by App)
    //   //   in App
    //   logComponentStackToMyService(info.componentStack);
    // }

    componentDidMount() {
      /**
       * 前置执行 didMount 方法；
       */
      const { dispatch, $payload } = this.props;
      if (!pageModel) {
        return;
      }
      if (pageModel.actions.didMount) {
        setTimeout(() => {
          /* 传入页面options 即可： this.props.location.state */
          dispatch(pageModel.actions.didMount($payload));
        }, 0);
      }
      if (super.componentDidMount) {
        super.componentDidMount();
      }
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }

    render() {
      console.log("$pageStatus>>>>", this.props.$pageStatus);
      const { $pageStatus } = this.props;
      if ($pageStatus === "error") {
        return <ErrorBoundary msg={"页面渲染失败，请刷新重试"} />;
      }
      return super.render();
    }
  }
  return BasePageComponent;
};
