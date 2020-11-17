import * as React from "react";

interface IUser {
	name: string;
	id: string;
}
type error = string | Array<string>;
type State = {
	token: string | null;
	user: IUser | undefined;
	error: null | error;
	loading: boolean;
};
type Action =
	| { type: "Login start" }
	| { type: "Login success"; payload: { token: string; user: IUser } }
	| { type: "Login fail"; payload: error };
type Dispatch = (action: Action) => void;

const AuthStateContext = React.createContext<State | undefined>(undefined);
const AuthDispatchContext = React.createContext<Dispatch | undefined>(
	undefined
);

export const initialState: State = {
	user: undefined,
	token: null,
	error: null,
	loading: false,
};

export const AuthReducer = (state = initialState, action: Action) => {
	switch (action.type) {
		case "Login start":
			return {
				...state,
				loading: true,
			};
		case "Login success":
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				loading: false,
			};
		case "Login fail":
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const AuthProvider = ({ children }) => {
	const [user, dispatch] = useReducer(AuthReducer, initialState);

	return (
		<AuthStateContext.Provider value={user}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
};

export function useAuthState() {
	const context = React.useContext(AuthStateContext);
	if (context === undefined) {
		throw new Error("useAuthState must be used within an AuthProvider");
	}
	return context;
}

export function useAuthDispatch() {
	const context = React.useContext(AuthDispatchContext);
	if (context === undefined) {
		throw new Error("useAuthDispatch must be used within an AuthProvider");
	}
	return context;
}
