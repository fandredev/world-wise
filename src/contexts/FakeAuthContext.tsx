import { createContext, useReducer } from 'react';
import { authReducer, INITIAL_STATE, User } from '../store/auth-reducer';
import { FAKE_USER } from '../utils/auth-user';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);

function AuthProvider({ children }: AuthProviderProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    INITIAL_STATE
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'login', payload: FAKE_USER });
    }
  }

  function logout() {}

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
