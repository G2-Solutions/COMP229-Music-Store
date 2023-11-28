import React, { useState, useEffect } from 'react';
import { read } from './api-user.js';
import { Navigate, Link, useParams } from 'react-router-dom';
import auth from '../auth/auth-helper.js';


const useStyles = {
  root: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '24px',
    marginTop: '40px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
  },
  title: {
    marginTop: '24px',
    color: '#333',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  avatar: {
    marginRight: '16px',
    borderRadius: '50%',
    overflow: 'hidden',
    width: '40px',
    height: '40px',
  },
  listItemText: {
    flex: '1',
  },
  deleteButton: {
    marginLeft: '16px',
  },
};

const Profile = ({ match }) => {
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();
  const { userId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ userId: userId }, { t: jwt.token }, signal).then((data) => {
      if (!abortController.signal.aborted) {
        if (data && data.error) {
          setRedirectToSignin(true);
        } else {
          setUser(data);
        }
      }
    });


    return function cleanup() {
      abortController.abort();
    };
  }, [userId]);

  if (redirectToSignin) {
    return <Navigate to="/login" />;
  }


  return (
    <div style={useStyles.root}>
      <h2 style={useStyles.title}>Profile</h2>
      <ul style={{ padding: '0', listStyleType: 'none', margin: '0' }}>
        <li style={useStyles.listItem}>
          <div style={useStyles.avatar}>
            <img src="default-profile.png" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={useStyles.listItemText}>
            <p>{user.name}</p>
            <p>{user.email}</p>
            {auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id && user._id && (
              <div>
                <Link to={"/user/edit/" + user._id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <button style={{ marginRight: '16px' }}>Edit</button>
                </Link>
                <DeleteUser userId={user._id} />
              </div>
            )}
          </div>
        </li>
        <hr />
        <li style={useStyles.listItem}>
          <div style={useStyles.listItemText}>
            <p>{`Joined: ${new Date(user.created).toDateString()}`}</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
