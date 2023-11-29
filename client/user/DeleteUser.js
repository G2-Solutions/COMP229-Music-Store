import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { remove } from './api-user';
import { useParams } from 'react-router-dom';

export default function DeleteUser() {
  const [open, setOpen] = useState(false);
  const [navigate, setNavigate] = useState(false);

  const { userId } = useParams(); // get userId from URL parameters

  const clickButton = () => {
    setOpen(true);
  };

  const deleteAccount = () => {
    remove({ userId }, { t: jwt.token }).then((data) => { // pass userId to remove function
      if (data && data.error) {
        console.log(data.error);
      } else {
        auth.clearJWT(() => console.log('deleted'));
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
      {/* ... */}
    </span>
  );
}

DeleteUser.propTypes = {
  userId: PropTypes.string.isRequired,
};
