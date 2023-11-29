import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './styles/styles.css';
import PrivateRoute from './auth/PrivateRoute'
import Home from './core/Home.js'
import Signup from './user/SignUp.js';
import Login from './auth/Login.js';
import Profile from './user/Profile.js';
// import EditProfile from './user/EditProfile.js';
// import DeleteUser from './user/DeleteUser.js';
import Users from './user/Users.js';
import Navbar from './core/Navbar.js';

const MainRouter = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path=":userId" element={<Profile />} /> {/* Change this line */}
          {/* <Route path="editprofile/:userId" element={<EditProfile />} />
          <Route path="deleteuser/:userId" element={<DeleteUser />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default MainRouter
