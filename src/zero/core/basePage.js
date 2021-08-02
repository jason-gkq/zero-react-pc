import React from "react";
import RegisterPage from "./registerPage";
import { PageLoading, ErrorBoundary } from "../components";

export default (pageModel) => (WrappedComponent) => {
  @RegisterPage(pageModel)
  class BasePageComponent extends WrappedComponent {
    constructor(props) {
      super(props);
    }

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
      const { $pageStatus } = this.props;
      switch ($pageStatus) {
        case "loading":
          return <PageLoading />;
        case "error":
          return <ErrorBoundary msg={"页面渲染失败，请刷新重试"} />;
        default:
          return super.render();
      }
    }
  }
  return BasePageComponent;
};
