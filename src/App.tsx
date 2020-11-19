import * as React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/index";
// Components
import Header from "./containers/header/Header.component";

// Pages
import UserRoute from "./containers/AppRoute/AppRoute.component";
import BoardPage from "./pages/board/BoardPage.page";

import "./App.css";

const App = () => {
	return (
		<div className="App">
			<Header user={{ name: "Sven" }} />
			<AuthProvider>
				<Switch>
					<Route path={"/user"} component={UserRoute} />
					<Route path={"/board"} component={BoardPage} />
				</Switch>
			</AuthProvider>
		</div>
	);
};

export default App;
