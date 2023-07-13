import React from 'react';
import { Button, Result } from 'antd';

export class ErrorBoundary extends React.Component<any> {
  state = { hasError: false, error: undefined };
  constructor(props: any) {
    super(props);
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Result
          status='404'
          title='请刷新页面'
          subTitle={
            this.state.error || '您好，页面功能升级，请刷新页面体验最新功能.'
          }
          extra={
            <Button
              type='primary'
              danger
              onClick={() => {
                window.location.reload();
              }}
            >
              刷新页面
            </Button>
          }
          style={{
            height: '100%',
            background: '#fff',
          }}
        />
      );
    }

    return this.props.children;
  }
}
