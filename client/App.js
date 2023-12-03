import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './auth/AuthContext';
import MainRouter from './MainRouter';

function App() {
  const [isSignedIn, setSignIn] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('jwt');
    setSignIn(!!token);
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ isSignedIn, setSignIn, authUser, setAuthUser }}>
        <MainRouter />
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
