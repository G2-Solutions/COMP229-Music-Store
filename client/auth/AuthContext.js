import { createContext } from 'react';

const AuthContext = createContext({
  isSignedIn: false,
  setSignIn: () => {}
});

export default AuthContext;
