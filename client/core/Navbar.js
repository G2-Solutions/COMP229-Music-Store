import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../assets/images/logo-transparent.png';
import { signout } from '../auth/api-auth.js';
import AuthContext from '../auth/AuthContext.js'

const Navbar = () => {
  const { isSignedIn, setSignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignout = async () => {
    await signout();
    setSignIn(false);
    navigate('/');
  };

  const handleLogIn = () => {
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li className="logo">
          <img src={logo} alt="Logo" />
          MelodyMart
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
<<<<<<< HEAD
        {!isSignedIn && (
          <li className="login" onClick={handleLogIn}>
            Sign In
          </li>
        )}
        {isSignedIn && (
=======
        {isSignedIn ? (
>>>>>>> 4b696a7ccd9cbe09c454a8333908645fc1817722
          <>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/profile">My Profile</Link>
            </li>
            <li className="signout" onClick={handleSignout}>
              Sign Out
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li className="signout">
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
