import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { checkUserSession, useAuthDispatch } from "./context/index";
// Components
import Header from "./components/header/Header.component";

// Pages
import UserRoute from "./components/UserRoute/UserRoute.component";
import BoardPage from "./pages/board/Board.page";
import ProfilePage from "./pages/profile/Profile.page";

import "./App.css";

const App = () => {
	const dispatch = useAuthDispatch();
	React.useEffect(() => {
		checkUserSession(dispatch);
	});
	return (
		<div className="App">
			<Header />
			<Switch>
				<Route path={"/"} exact render={() => <UserRoute />} />
				<Route
					path={"/boards/:boardId"}
					exact
					render={() => <BoardPage />}
				/>
				<Route path={"/profile"} exact component={ProfilePage} />
			</Switch>
		</div>
	);
};

export default App;
