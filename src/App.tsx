import * as React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
// Components
import Header from "./containers/header/Header.component";

// Pages
import LoginRegisterPage from "./pages/login-register/LoginRegister.page";
import UserPage from "./pages/user/UserPage.page";
import BoardPage from "./pages/board/BoardPage.page";

import "./App.css";

const App = () => {
	const [user, setUser] = React.useState({
		token: "dfsdglksfjglkfjg",
		id: "12RdfFDGY43YTRHds",
		name: "Sven Soldin",
	});
	return (
		<div className="App">
			<Header user={user} />
			<Switch>
				<Route path={"/"} component={user ? UserPage : LoginRegisterPage} />
				<Route path={"/board"} component={BoardPage} />
			</Switch>
		</div>
	);
};

export default App;
