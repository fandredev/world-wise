import { FAKE_USER } from "../utils/auth-user";

export type User = typeof FAKE_USER;

type AuthActions = {
  type: 'login';
  payload: User;
} | {
  type: 'logout';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export const INITIAL_STATE = {
  user: null,
  isAuthenticated: false
} 


export function authReducer(state: AuthState, action: AuthActions) {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'logout':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error('Invalid action');
  }
}