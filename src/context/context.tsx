import * as React from "react";
import {
	State,
	Dispatch,
	AuthReducer,
	initialState,
	UserDetails,
} from "./reducer";

type AuthProviderProps = { children: React.ReactNode };

const AuthStateContext = React.createContext<State | undefined>(undefined);
const AuthDispatchContext = React.createContext<Dispatch | undefined>(
	undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, dispatch] = React.useReducer(AuthReducer, initialState);
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
