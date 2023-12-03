import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { remove } from './api-user';
import auth from '../auth/auth-helper';
import AuthContext from '../auth/AuthContext';

export default function DeleteUser({ userId }) {
  const jwt = auth.isAuthenticated();
  const [open, setOpen] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const { setSignIn, setAuthUser } = useContext(AuthContext);

  const clickButton = () => {
    setOpen(true);
  };

  const deleteAccount = () => {
    remove({ userId }, { t: jwt.token }).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        auth.clearJWT(() => console.log('deleted'));
        setSignIn(false);
        setAuthUser(null);
        setNavigate(true);
      }
    });
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  if (navigate) {
    return <Navigate to="/" />;
  }

  return (
    <span>
      <button className="delete-button" onClick={clickButton}>Delete</button>
      {open && (
        <div>
          <h3>Confirm Delete</h3>
          <p>Are you sure you want to delete your account?</p>
          <button className="delete-button" onClick={deleteAccount}>Yes</button>
          <button className="delete-button" onClick={handleRequestClose}>No</button>
        </div>
      )}
    </span>
  );
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
};
