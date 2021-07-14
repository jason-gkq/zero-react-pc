import RegisterPage from "./registerPage";

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
      const { dispatch } = this.props;
      if (!pageModel) {
        return;
      }
      // setTimeout(() => {
      if (pageModel.actions.didMount) {
        /* 传入页面options 即可： this.props.location.state */
        dispatch(pageModel.actions.didMount(this.props.location.state || {}));
      }
      // }, 0);
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
      return super.render();
    }
  }
  return BasePageComponent;
};
