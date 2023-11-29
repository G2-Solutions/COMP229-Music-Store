import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './auth/AuthContext';
import MainRouter from './MainRouter';

const App = () => {
  const [isSignedIn, setSignIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    setSignIn(!!token);
  }, []);

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ isSignedIn, setSignIn }}>
        <MainRouter />
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
