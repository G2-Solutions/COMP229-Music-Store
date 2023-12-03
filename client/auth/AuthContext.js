import { createContext } from 'react';

const AuthContext = createContext({
  isSignedIn: false,
  setSignIn: () => {},
  authUser: null,
  setAuthUser: () => {},
});

export default AuthContext;
