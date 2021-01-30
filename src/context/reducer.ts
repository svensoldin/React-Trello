import { Reducer } from 'react';

type error = string | Array<string>;

export type State = {
  userDetails: {
    name: string;
    id: string;
    email: string;
  };
  error: null | error;
  loading: boolean;
};

export type Dispatch = (action: Action) => void;

export const initialState: State = {
  userDetails: { name: '', id: '', email: '' },
  error: null,
  loading: false,
};

type Action =
  | { type: 'Login start' }
  | {
      type: 'Login success';
      payload: { name: string; id: string; email: string };
    }
  | { type: 'Login fail'; payload: error }
  | { type: 'Logout' };

export const AuthReducer: Reducer<State, Action> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'Login start':
      return {
        ...state,
        loading: true,
      };
    case 'Login success':
      return {
        ...state,
        userDetails: action.payload,
        loading: false,
      };
    case 'Login fail':
      return {
        ...state,
        error: action.payload,
      };
    case 'Logout':
      return {
        ...state,
        userDetails: { name: '', id: '', email: '' },
      };
    default:
      return state;
  }
};
