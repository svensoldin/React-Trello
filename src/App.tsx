import * as React from "react";
import { Switch, Route } from "react-router-dom";

import { useSession, useAuthDispatch } from "./context/index";
// Components
import Header from "./components/header/Header.component";
import ProtectedRoute from "./components/protected-route/ProtectedRoute.component";

// Pages
import UserRoute from "./components/UserRoute/UserRoute.component";
import BoardPage from "./pages/board/Board.page";
import ProfilePage from "./pages/profile/Profile.page";

import "./App.css";

const App = () => {
	const dispatch = useAuthDispatch();
	const { isLoading } = useSession(dispatch);
	return !isLoading ? (
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
	) : null;
};

export default App;
