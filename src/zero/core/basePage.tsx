import React from "react";
import RegisterPage from "./registerPage";
import { PageLoading, Exception } from "../components";
import { isEmptyObject } from "../utils";

import type { IPageConfig, IModel, IProps } from "../types/zero";

export default (pageConfig: IPageConfig, pageModel?: IModel) => (
  WrappedComponent: typeof React.PureComponent
) => {
  @RegisterPage(pageConfig, pageModel)
  class BasePageComponent extends WrappedComponent<IProps, any> {
    constructor(props: IProps) {
      super(props);
    }

    componentDidMount() {
      /**
       * 前置执行 didMount 方法；
       */
      if (super.componentDidMount) {
        super.componentDidMount();
      }

      if (!pageModel || isEmptyObject(pageModel)) {
        return;
      }
      const { $dispatch, $payload } = this.props;
      if (pageModel.actions.didMount) {
        // setTimeout(() => {
        /* 传入页面options 即可： this.props.location.state */
        $dispatch(pageModel.actions.didMount($payload));
        // }, 0);
      }
    }

    render() {
      const { $hasError } = this.props;
      if ($hasError) {
        return <Exception />;
      }
      return super.render();
    }
  }
  return BasePageComponent;
};
