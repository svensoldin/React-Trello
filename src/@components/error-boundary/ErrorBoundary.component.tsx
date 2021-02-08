import * as React from 'react';

type Props = {
  children: React.ReactNode;
};
type State = {
  hasError: boolean;
  error: undefined | string;
};

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <>
          <h3>Oh nooon, something went wrong :&#40;</h3>
          <p>{this.state.error}</p>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
