import React from 'react'
import {Route, Routes} from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import Home from './core/Home.js'
import Signup from './user/SignUp.js';
import Signin from './user/SignIn.js';
import Profile from './user/Profile.js';
import EditProfile from './user/EditProfile.js';
import DeleteUser from './user/DeleteUser.js';
import User from './user/User.js';

const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/deleteuser" element={<DeleteUser />} />
        <Route path="/user" element={<User />} />
        
      </Routes>
    </div>
  );
};

export default MainRouter
