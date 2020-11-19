import * as React from "react";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/index";
// Components
import Header from "./components/header/Header.component";

// Pages
import UserRoute from "./components/UserRoute/UserRoute.component";
import BoardPage from "./pages/board/Board.page";

import "./App.css";

export type Board = {
	title: string;
	columns: Array<any>;
	admins: Array<string>;
	users: Array<string>;
	_id: string;
};

const App = () => {
	const [boards, setBoards] = React.useState([]);

	return (
		<div className="App">
			<AuthProvider>
				<Header />
				<Switch>
					<Route
						path={"/"}
						exact
						render={() => (
							<UserRoute setBoards={setBoards} boards={boards} />
						)}
					/>
					<Route
						path={"/boards/:boardId"}
						exact
						render={() => <BoardPage boards={boards} />}
					/>
				</Switch>
			</AuthProvider>
		</div>
	);
};

export default App;
