import React, { useState, useEffect, useContext } from 'react';
import { read } from './api-user.js';
import { Navigate, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import auth from '../auth/auth-helper.js';
import DeleteUser from './DeleteUser.js';
import AuthContext from '../auth/AuthContext.js';
import '../styles/styles.css';
import '../styles/profile.css';

const Profile = () => {
  const { authUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams();

  useEffect(() => {
    const jwt = auth.isAuthenticated();
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (!jwt) {
      navigate('/', { state: { from: location } });
    } else {
      read({ userId: userId }, { t: jwt.token }, signal).then((data) => {
        if (!abortController.signal.aborted) {
          if (data && data.error) {
            navigate('/signin', { state: { from: location } });
          } else {
            setUser(data);
          }
        }
      });
    }

    return function cleanup() {
      abortController.abort();
    };
  }, [userId, navigate, location]);

  if (!auth.isAuthenticated()) {
    return <Navigate to="/signin" />;
  }

  const authenticatedUser = auth.isAuthenticated().user;

  return (
    <div className="root">
      <h2>{authUser === user._id ? "My Profile" : "Profile"}</h2>
      <div className="gridContainer">
        <div className="labelColumn">
          <div className="listItemText">
            <p><strong>Name:</strong></p>
          </div>
          <div className="listItemText">
            <p><strong>Email:</strong></p>
          </div>
          <div className="listItemText">
            <p><strong>Joined:</strong></p>
          </div>
        </div>
        <div className="infoColumn">
          <div className="listItemText">
            <p>{user.name}</p>
          </div>
          <div className="listItemText">
            <p>{user.email}</p>
          </div>
          <div className="listItemText">
            <p>{new Date(user.created).toDateString()}</p>
          </div>
        </div>
      </div>
      <div className="editDeleteContainer">
        {authUser === user._id && user._id && (
          <div>
            <Link to={"/editprofile/" + user._id} className="edit-link">
              <button className="edit-button">Edit</button>
            </Link>
            <DeleteUser userId={authUser} />
          </div>
        )}
      </div>
      {authUser !== user._id && user._id && (
        <Link to={"/users"}><button className="edit-button">Back</button></Link>
      )}
    </div>
  );
};

export default Profile;
