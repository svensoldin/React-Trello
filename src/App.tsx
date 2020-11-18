import * as React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/index";
// Components
import Header from "./containers/header/Header.component";

// Pages
import LoginRegisterPage from "./pages/login-register/LoginRegister.page";
import UserPage from "./pages/user/UserPage.page";
import BoardPage from "./pages/board/BoardPage.page";

import "./App.css";

const App = () => {
	return (
		<div className="App">
			<Header user={user} />
			<AuthProvider>
				<Switch>
					<Route
						path={"/"}
						component={user ? UserPage : LoginRegisterPage}
					/>
					<Route path={"/board"} component={BoardPage} />
				</Switch>
			</AuthProvider>
		</div>
	);
};

export default App;
