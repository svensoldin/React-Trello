type UserDetails = {
	name: string;
	id: string;
};
type error = string | Array<string>;

export type State = {
	userDetails: UserDetails;
	token: string | null;
	error: null | error;
	loading: boolean;
};

export type Dispatch = (action: Action) => void;

// let user = localStorage.getItem("currentUser")
// 	? JSON.parse(localStorage.getItem("currentUser"))
// 	: null;

// let token = localStorage.getItem("token")
// 	? localStorage.getItem("token")
// 	: null;

export const initialState: State = {
	userDetails: { name: "", id: "" },
	token: null,
	error: null,
	loading: false,
};

type Action =
	| { type: "Login start" }
	| {
			type: "Login success";
			payload: { token: string; userDetails: UserDetails };
	  }
	| { type: "Login fail"; payload: error }
	| { type: "Logout" };

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
				userDetails: action.payload.userDetails,
				token: action.payload.token,
				loading: false,
			};
		case "Login fail":
			return {
				...state,
				error: action.payload,
			};
		case "Logout":
			return {
				...state,
				userDetails: { name: "", id: "" },
				token: null,
			};
		default:
			return state;
	}
};
