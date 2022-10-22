import React from "react";
import ContainerPage from "./ContainerPage";
import { Exception } from "../components";
import { isEmptyObject } from "../utils";

import type { IPageConfig, IModel, IProps } from "../types/zero";

export default (pageConfig: IPageConfig, pageModel?: IModel) =>
  (WrappedComponent: typeof React.PureComponent) => {
    @ContainerPage(pageConfig, pageModel)
    class BasePageComponent extends WrappedComponent<IProps, any> {
      constructor(props: IProps) {
        super(props);
      }

      componentDidMount() {
        if (super.componentDidMount) {
          super.componentDidMount();
        }

        if (!pageModel || isEmptyObject(pageModel)) {
          return;
        }

        /**
         * 前置执行 onReady 方法；
         */
        if (pageModel.actions.onReady) {
          const { $dispatch, $payload } = this.props;
          // setTimeout(() => {
          /* 传入页面options 即可： this.props.location.state */
          $dispatch(pageModel.actions.onReady($payload));
          // }, 0);
        }
      }

      render() {
        const { $hasError } = this.props;
        if ($hasError) {
          return <Exception code={$hasError} />;
        }
        return super.render();
      }
    }

    return BasePageComponent;
  };
