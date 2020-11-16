import * as React from "react";
// Components
import Header from "./containers/header/Header.component";

// Pages
import LoginRegisterPage from "./pages/login-register/LoginRegister.page";

import "./App.css";

const App = () => {
	return (
		<div className="App">
			<Header user={{ name: "Sven" }} boardName="Sven's team" />
			<LoginRegisterPage />
		</div>
	);
};

export default App;
