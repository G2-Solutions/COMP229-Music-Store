import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../assets/images/logo-transparent.png';
import { signout } from '../auth/api-auth.js';
import AuthContext from '../auth/AuthContext.js'

const Navbar = () => {
  const { isSignedIn, setSignIn, authUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignout = async () => {
    await signout();
    setSignIn(false);
    navigate('/');
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
        {isSignedIn ? (
          <>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to={`/user/${authUser}`}>My Profile</Link>
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
