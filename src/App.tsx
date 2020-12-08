import * as React from "react";
import { Switch, Route } from "react-router-dom";

import {
	checkUserSession,
	useAuthDispatch,
	useAuthState,
} from "./context/index";
// Components
import Header from "./components/header/Header.component";
import ProtectedRoute from "./components/protected-route/ProtectedRoute.component";

// Pages
import UserRoute from "./components/UserRoute/UserRoute.component";
import BoardPage from "./pages/board/Board.page";
import ProfilePage from "./pages/profile/Profile.page";

import "./App.css";

const App = () => {
	const [isLoading, setIsLoading] = React.useState<boolean>(true);
	const dispatch = useAuthDispatch();
	React.useEffect(() => {
		checkUserSession(dispatch, setIsLoading);
	}, [dispatch]);
	return isLoading ? null : (
		<div className="App">
			<Header />
			<Switch>
				<Route path={"/"} exact component={UserRoute} />
				<ProtectedRoute
					component={BoardPage}
					path={"/boards/:boardId"}
					exact
				/>
				<ProtectedRoute path={"/profile"} exact component={ProfilePage} />
			</Switch>
		</div>
	);
};

export default App;
