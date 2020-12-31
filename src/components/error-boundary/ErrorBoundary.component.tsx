import * as React from "react";

type Props = {
	children: React.ReactNode;
};
type State = {
	hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: any) {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return <h1>Oh nooon, something went wrong :&#40;</h1>;
		}
		return this.props.children;
	}
}

export default ErrorBoundary;
