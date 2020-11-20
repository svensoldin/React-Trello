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
	const [boards, setBoards] = React.useState<Board[] | undefined>([]);

	// This state is for displaying the board title in the header
	const [currentBoard, setCurrentBoard] = React.useState<Board>();
	return (
		<div className="App">
			<AuthProvider>
				<Header currentBoard={currentBoard} />
				<Switch>
					<Route
						path={"/"}
						exact
						render={() => (
							<UserRoute
								setBoards={setBoards}
								boards={boards}
								setCurrentBoard={setCurrentBoard}
							/>
						)}
					/>
					<Route
						path={"/boards/:boardId"}
						exact
						render={() => (
							<BoardPage
								boards={boards}
								setCurrentBoard={setCurrentBoard}
							/>
						)}
					/>
				</Switch>
			</AuthProvider>
		</div>
	);
};

export default App;
