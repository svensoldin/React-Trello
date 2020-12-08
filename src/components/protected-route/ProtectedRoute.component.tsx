import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthState } from "../../context/index";

type Props = {
	component: () => JSX.Element;
	path: string;
	exact: boolean;
};

const ProtectedRoute = ({ ...props }: Props) => {
	const {
		userDetails: { id },
	} = useAuthState();
	return id ? <Route {...props} /> : <Redirect to={"/"} />;
};

export default ProtectedRoute;
