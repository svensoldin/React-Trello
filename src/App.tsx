import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/index";
// Components
import Header from "./components/header/Header.component";

// Pages
import UserRoute from "./components/UserRoute/UserRoute.component";
import BoardPage from "./pages/board/Board.page";
import ProfilePage from "./pages/profile/Profile.page";

import "./App.css";

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<AuthProvider>
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
				</AuthProvider>
			</BrowserRouter>
		</div>
	);
};

export default App;
