import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../assets/images/logo-transparent.png';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li className="logo">
          <img src={logo} />
          MelodyMart
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/profile">My Profile</Link>
        </li>
        <li className="signout">
          Sign Out
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
