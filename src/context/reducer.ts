type UserDetails = {
	name: string;
	id: string;
	email: string;
};
type error = string | Array<string>;

export type State = {
	userDetails: UserDetails;
	error: null | error;
	loading: boolean;
};

export type Dispatch = (action: Action) => void;

let user: UserDetails | null = localStorage.getItem("user")
	? JSON.parse(localStorage.getItem("user") || "{}")
	: null;

export const initialState: State = {
	userDetails: user ? user : { name: "", id: "", email: "" },
	error: null,
	loading: false,
};

type Action =
	| { type: "Login start" }
	| {
			type: "Login success";
			payload: { userDetails: UserDetails };
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
				userDetails: { name: "", id: "", email: "" },
			};
		default:
			return state;
	}
};
